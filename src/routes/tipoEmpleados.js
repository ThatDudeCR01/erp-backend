const express = require("express");
const {
  createTipoEmpleado,
  getAllTiposEmpleado,
  getTipoEmpleadoById,
  updateTipoEmpleado,
  deleteTipoEmpleado,
} = require("../controllers/tipoEmpleado");
const router = express.Router();
const tipoEmpleadoValidacion = require("../validators/tipoEmpleado");

router.get("/", getAllTiposEmpleado);

router.post("/", tipoEmpleadoValidacion, createTipoEmpleado);

router.get("/:id", getTipoEmpleadoById);

router.put("/:id", tipoEmpleadoValidacion, updateTipoEmpleado);

router.delete("/:id", deleteTipoEmpleado);

module.exports = router;
