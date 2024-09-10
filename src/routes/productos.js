const express = require("express");
const {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
} = require("../controllers/producto");

const router = express.Router();
const { validationResult } = require("express-validator");
const {
  productoValidacion,
  actualizarProductoValidacion,
} = require("../validators/producto");

router.post("/", productoValidacion, createProducto);

router.get("/", getAllProductos);

router.get("/:id", getProductoById);

router.patch("/:id", actualizarProductoValidacion, updateProducto);

router.delete("/:id", deleteProducto);

module.exports = router;
