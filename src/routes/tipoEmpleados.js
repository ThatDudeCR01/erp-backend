const express = require("express");
const tipoEmpleado = require("../controllers/tipoEmpleado");
const router = express.Router();
const { validationResult } = require("express-validator");
const tipoEmpleadoValidacion = require("../validators/tipoEmpleado");

router.get("/", tipoEmpleado.getAllTiposEmpleado);

// Ruta para crear un nuevo tipo de empleado, aplicando las validaciones
router.post("/", tipoEmpleadoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  tipoEmpleado.createTipoEmpleado(req, res, next);
});

router.get("/:id", tipoEmpleado.getTipoEmpleadoById);

// Actualizar tipo de empleado
router.put("/:id", tipoEmpleadoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  tipoEmpleado.updateTipoEmpleado(req, res, next);
});

// Eliminar tipo de empleado
router.delete("/:id", tipoEmpleado.deleteTipoEmpleado);

module.exports = router;
