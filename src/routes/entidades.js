const express = require("express");
const entidad = require("../controllers/entidad");
const router = express.Router();
const { validationResult } = require("express-validator");
const entidadValidacion = require("../validators/entidad");

router.get("/", entidad.getAllEntidades);

// Ruta para crear una nueva entidad, aplicando las validaciones
router.post("/", entidadValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  entidad.createEntidad(req, res, next);
});

router.get("/:id", entidad.getEntidadById);

// Actualizar una entidad
router.put("/:id", entidadValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  entidad.updateEntidad(req, res, next);
});

// Eliminar una entidad
router.delete("/:id", entidad.deleteEntidad);

module.exports = router;
