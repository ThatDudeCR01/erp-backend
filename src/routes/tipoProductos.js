const express = require("express");
const {
  createTipoProducto,
  getAllTiposProducto,
  getTipoProductoById,
  updateTipoProducto,
  deleteTipoProducto,
} = require("../controllers/tipoProducto");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
  tipoProductoValidacion,
  actualizarTipoProductoValidacion,
} = require("../validators/tipoProducto");

router.post("/", tipoProductoValidacion, createTipoProducto);

router.get("/", getAllTiposProducto);

router.get("/:id", getTipoProductoById);

router.patch("/:id", actualizarTipoProductoValidacion, updateTipoProducto);

router.delete("/:id", deleteTipoProducto);

module.exports = router;
