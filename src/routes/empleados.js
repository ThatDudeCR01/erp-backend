const express = require("express");
const empleado = require("../controllers/empleado");
const router = express.Router();
const { validationResult } = require("express-validator");
const empleadoValidacion = require("../validators/empleado");

router.get("/", empleado.getAllEmpleados);

// Ruta para crear un nuevo empleado, aplicando las validaciones
router.post("/", empleadoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  empleado.createEmpleado(req, res, next);
});

router.get("/:id", empleado.getEmpleadoById);

// Actualizar un empleado
router.put("/:id", empleadoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  empleado.updateEmpleado(req, res, next);
});

// Eliminar un empleado
router.delete("/:id", empleado.deleteEmpleado);

module.exports = router;
