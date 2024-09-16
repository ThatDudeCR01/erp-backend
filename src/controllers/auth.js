const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const Usuario = require("../models/usuario");
const Rol = require("../models/roles");
// sgMail.setApiKey(process.env.NODE_SENDGRID_API_KEY);

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos." });
    }
    
    const rolePermisos = await Rol.findById(usuario.active_role);

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos." });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        permisos: rolePermisos.permisos,
      },
      process.env.NODE_JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Autenticación exitosa", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la autenticación", error: error.message });
  }
};

const passwordReset = async (req, res) => {
  const { correo } = req.body;

  try {
    const user = await Usuario.findOne({ correo });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado " });
    }

    // Generate a password reset token
    const token = crypto.randomBytes(32).toString("hex");
    user.reiniciar_contraseña_token = token;
    user.reiniciar_contraseña_token_expira = Date.now() + 3600000;

    await user.save();

    // Create the password reset link
    const resetLink = `${process.env.NODE_RESET_PASSWORD_URL}?token=${token}&email=${correo}`;

    // Send the email using SendGrid
    const msg = {
      to: correo,
      from: "bella@akronym.cr",
      subject: "Password Reset",
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      html: `<p>You requested a password reset. Click the link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    };

    console.log(resetLink);
    await sgMail.send(msg);

    res.status(200).send({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "An error occurred", error });
  }
};

const resetPassword = async (req, res) => {
  const { token, correo, contraseña } = req.body;

  try {
    const user = await Usuario.findOne({
      correo,
      reiniciar_contraseña_token: token,
      reiniciar_contraseña_token_expira: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    user.contraseña = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).send({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
};

module.exports = { login, passwordReset, resetPassword };
