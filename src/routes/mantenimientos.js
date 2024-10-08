const express = require("express");
const {
  createMantenimiento,
  getAllMantenimientos,
  getMantenimientoById,
  updateMantenimiento,
  deleteMantenimiento,
} = require("../controllers/mantenimiento");
const router = express.Router();
const mantenimientoValidacion = require("../validators/mantenimiento");

router.post("/", mantenimientoValidacion, createMantenimiento);

router.get("/", getAllMantenimientos);

router.get("/:id", getMantenimientoById);

router.put("/:id", mantenimientoValidacion, updateMantenimiento);

router.delete("/:id", deleteMantenimiento);

module.exports = router;
