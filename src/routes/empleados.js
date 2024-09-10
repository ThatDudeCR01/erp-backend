const express = require("express");
const {
  createEmpleado,
  getAllEmpleados,
  getEmpleadoById,
  updateEmpleado,
  deleteEmpleado,
} = require("../controllers/empleado");

const router = express.Router();
const {
  empleadoValidacion,
  actualizarEmpleadoValidacion,
} = require("../validators/empleado");

router.get("/", getAllEmpleados);

router.get("/:id", getEmpleadoById);

router.post("/", empleadoValidacion, createEmpleado);

router.patch("/:id", actualizarEmpleadoValidacion, updateEmpleado);

router.delete("/:id", deleteEmpleado);

module.exports = router;
