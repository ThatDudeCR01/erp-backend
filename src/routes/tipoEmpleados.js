const express = require("express");
const {
  createTipoEmpleado,
  getAllTiposEmpleado,
  getTipoEmpleadoById,
  updateTipoEmpleado,
  deleteTipoEmpleado,
} = require("../controllers/tipoEmpleado");
const router = express.Router();
const {
  tipoEmpleadoValidacion,
  tipoEmpleadoActualizacionValidacion,
} = require("../validators/tipoEmpleado");

router.post("/", tipoEmpleadoValidacion, createTipoEmpleado);

router.get("/", getAllTiposEmpleado);

router.get("/:id", getTipoEmpleadoById);

router.patch("/:id", tipoEmpleadoActualizacionValidacion, updateTipoEmpleado);

router.delete("/:id", deleteTipoEmpleado);

module.exports = router;
