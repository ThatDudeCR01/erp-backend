const express = require("express");
const router = express.Router();
const {
  createEntidad,
  getAllEntidades,
  getEntidadById,
  updateEntidad,
  deleteEntidad,
} = require("../controllers/entidad");
const entidadValidacion = require("../validators/entidad");

router.get("/", getAllEntidades);

router.post("/", entidadValidacion, createEntidad);

router.get("/:id", getEntidadById);

router.patch("/:id", updateEntidad);

router.delete("/:id", deleteEntidad);

module.exports = router;
