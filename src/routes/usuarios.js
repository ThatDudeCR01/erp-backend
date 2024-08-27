const express = require("express");
const usuario = require("../controllers/usuario");
const router = express.Router();
const { validationResult } = require("express-validator");
const usuarioValidacion = require("../validators/usuario");

router.get("/", usuario.getAllUsuarios);

// Ruta para crear un nuevo usuario, aplicando las validaciones
router.post("/", usuarioValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  usuario.createUsuario(req, res, next);
});

router.get("/:id", usuario.getUsuarioById);

//actualizar
router.put("/:id", (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  usuario.updateUsuario(req, res, next);
});

router.delete("/:id", usuario.deleteUsuario);

module.exports = router;
