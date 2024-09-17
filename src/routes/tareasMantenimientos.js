const express = require("express");
const {
  createTareaMantenimiento,
  getAllTareasMantenimiento,
  getTareaMantenimientoById,
  updateTareaMantenimiento,
  deleteTareaMantenimiento,
} = require("../controllers/tareaMantenimiento");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
  tareaMantenimientoValidacion,
  actualizarTareaMantenimientoValidacion,
  validarTareaMantenimientoId,
} = require("../validators/tareaMantenimiento");

router.get("/", tareaMantenimientoValidacion, getAllTareasMantenimiento);

router.post("/", createTareaMantenimiento);

router.get("/:id", getTareaMantenimientoById);

router.patch(
  "/:id",
  actualizarTareaMantenimientoValidacion,
  updateTareaMantenimiento
);

router.delete("/:id", validarTareaMantenimientoId, deleteTareaMantenimiento);

module.exports = router;
