const express = require("express");
const tareaMantenimiento = require("../controllers/tareaMantenimiento");
const router = express.Router();
const { validationResult } = require("express-validator");
const tareaMantenimientoValidacion = require("../validators/tareaMantenimiento");

router.get("/", tareaMantenimiento.getAllTareasMantenimiento);

// Ruta para crear una nueva tarea de mantenimiento, aplicando las validaciones
router.post("/", tareaMantenimientoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  tareaMantenimiento.createTareaMantenimiento(req, res, next);
});

router.get("/:id", tareaMantenimiento.getTareaMantenimientoById);

// Actualizar tarea de mantenimiento
router.put("/:id", tareaMantenimientoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  tareaMantenimiento.updateTareaMantenimiento(req, res, next);
});

// Eliminar tarea de mantenimiento
router.delete("/:id", tareaMantenimiento.deleteTareaMantenimiento);

module.exports = router;
