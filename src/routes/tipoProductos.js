const express = require("express");
const tipoProducto = require("../controllers/tipoProducto");
const router = express.Router();
const { validationResult } = require("express-validator");
const tipoProductoValidacion = require("../validators/tipoProducto");

router.get("/", tipoProducto.getAllTiposProducto);

// Ruta para crear un nuevo tipo de producto, aplicando las validaciones
router.post("/", tipoProductoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  tipoProducto.createTipoProducto(req, res, next);
});

router.get("/:id", tipoProducto.getTipoProductoById);

// Actualizar tipo de producto
router.put("/:id", tipoProductoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  tipoProducto.updateTipoProducto(req, res, next);
});

// Eliminar tipo de producto
router.delete("/:id", tipoProducto.deleteTipoProducto);

module.exports = router;
