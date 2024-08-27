const express = require("express");
const producto = require("../controllers/producto");
const router = express.Router();
const { validationResult } = require("express-validator");
const productoValidacion = require("../validators/producto");

router.get("/", producto.getAllProductos);

// Ruta para crear un nuevo producto, aplicando las validaciones
router.post("/", productoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  producto.createProducto(req, res, next);
});

router.get("/:id", producto.getProductoById);

// Actualizar producto
router.put("/:id", productoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  producto.updateProducto(req, res, next);
});

// Eliminar producto
router.delete("/:id", producto.deleteProducto);

module.exports = router;
