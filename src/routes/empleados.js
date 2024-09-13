const express = require("express");
const {
  getAllEmpleados,
  createEmpleado,
  getEmpleadoById,
  updateEmpleado,
  deleteEmpleado,
} = require("../controllers/empleado");
const router = express.Router();

const {
  empleadoValidacion,
  actualizarEmpleadoValidacion,
} = require("../validators/empleado");

router.post("/", empleadoValidacion, createEmpleado);

router.get("/", getAllEmpleados);

router.get("/:id", getEmpleadoById);

router.patch("/:id", actualizarEmpleadoValidacion, updateEmpleado);

router.delete("/:id", deleteEmpleado);

module.exports = router;
