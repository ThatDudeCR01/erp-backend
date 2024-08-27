const jwt = require("jsonwebtoken");

// Middleware para verificar JWT
const auth = (req, res, next) => {
  // Obtener el token del header
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se encontró el token." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decodificar el token y agregar los datos del usuario a la solicitud
    next(); // Continuar con la siguiente función middleware o ruta
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = auth;
