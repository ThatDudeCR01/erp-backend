const express = require("express");
const roles = require("../controllers/roles");
const router = express.Router();
const { validationResult } = require("express-validator");
const rolesValidacion = require("../validators/roles");

router.get("/", roles.getAllRoles);

// Ruta para crear un nuevo rol, aplicando las validaciones
router.post("/", rolesValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  roles.createRol(req, res, next);
});

router.get("/:id", roles.getRolById);

// Actualizar rol
router.put("/:id", rolesValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  roles.updateRol(req, res, next);
});

// Eliminar rol
router.delete("/:id", roles.deleteRol);

module.exports = router;
