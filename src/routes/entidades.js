const express = require("express");
const router = express.Router();
const {
  createEntidad,
  getAllEntidades,
  getEntidadById,
  updateEntidad,
  deleteEntidad,
} = require("../controllers/entidad");
const {
  entidadValidacion,
  actualizarEntidadValidacion,
  validarEntidadId,
} = require("../validators/entidad");

router.get("/", getAllEntidades);

router.post("/", entidadValidacion, createEntidad);

router.get("/:id", getEntidadById);

router.patch("/:id", actualizarEntidadValidacion, updateEntidad);

router.delete("/:id", validarEntidadId, deleteEntidad);

module.exports = router;
