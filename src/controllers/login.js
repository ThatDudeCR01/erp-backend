const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos." });
    }

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos." });
    }

    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      process.env.NODE_JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la autenticación", error: error.message });
  }
};

module.exports = { login };
