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

const checkRoles = (allowedRoles) => {
  return (req, res, next) => {
    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return res.status(403).send({
        message: "Access Denied. You do not have the necessary roles.",
      });
    }
    next();
  };
};

module.exports = { verifyToken, checkRoles };
