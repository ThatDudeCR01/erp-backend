const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.header("Authorization")) {
    return res
      .status(401)
      .send({ message: "Access Denied. No token provided." });
  }

  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token || token === "") {
    return res
      .status(401)
      .send({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.NODE_JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Invalid Token" });
  }
};

const checkPermisos = (permisoParam) => {
  return (req, res, next) => {
    const permisos = req.user.permisos;

    if (!permisos || permisos.length === 0) {
      return res.status(403).json({
        message: "Acceso denegado. El usuario no tiene permisos asignados.",
      });
    }

    const [tabla, action] = permisoParam.split("/");

    const permiso = permisos.find((p) => p.tabla === tabla);

    if (!permiso) {
      return res.status(403).json({
        message: `Access denied. No permissions found for ${tabla}.`,
      });
    }

    if (permiso[action] === true) {
      next();
    } else {
      return res.status(403).json({
        message: `Access denied. You do not have ${action} permission for ${tabla}.`,
      });
    }
  };
};

module.exports = { verifyToken, checkPermisos };
