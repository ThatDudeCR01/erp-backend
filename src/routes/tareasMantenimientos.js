const express = require("express");
const {
  createTareaMantenimiento,
  getAllTareasMantenimiento,
  getTareaMantenimientoById,
  updateTareaMantenimiento,
  deleteTareaMantenimiento,
} = require("../controllers/tareaMantenimiento");
const router = express.Router();
const {
  validarTareaMantenimiento,
  validarTareaMantenimientoUpdate,
} = require("../validators/tareaMantenimiento");

router.post("/", validarTareaMantenimiento, createTareaMantenimiento);

router.get("/", getAllTareasMantenimiento);

router.get("/:id", getTareaMantenimientoById);

router.patch("/:id", validarTareaMantenimientoUpdate, updateTareaMantenimiento);

router.delete("/:id", deleteTareaMantenimiento);

module.exports = router;
