const express = require("express");
const {
  createProyecto,
  getAllProyectos,
  getProyectoById,
  updateProyecto,
  deleteProyecto,
} = require("../controllers/proyecto");

const router = express.Router();

const {
  proyectoValidacion,
  actualizarProductoValidacion,
} = require("../validators/proyecto");

router.post("/", proyectoValidacion, createProyecto);

router.get("/", getAllProyectos);

router.get("/:id", getProyectoById);

router.patch("/:id", actualizarProductoValidacion, updateProyecto);

router.delete("/:id", deleteProyecto);

module.exports = router;
