const express = require("express");
const {
  getAllEmpleados,
  createEmpleado,
  getEmpleadoById,
  updateEmpleado,
  deleteEmpleado,
} = require("../controllers/empleado");
const router = express.Router();

const empleadoValidacion = require("../validators/empleado");

router.get("/", getAllEmpleados);
router.get("/", getAllEmpleados);

router.post("/", empleadoValidacion, createEmpleado);

router.get("/:id", getEmpleadoById);

router.put("/:id", empleadoValidacion, updateEmpleado);

router.delete("/:id", deleteEmpleado);

module.exports = router;
