const express = require("express");
const proveedor = require("../controllers/proveedor");
const router = express.Router();
const { validationResult } = require("express-validator");
//const proveedorValidacion = require("../validators/proveedor");

router.get("/", proveedor.getAllProveedores);

// Ruta para crear un nuevo proveedor, aplicando las validaciones
router.post("/", (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  proveedor.createProveedor(req, res, next);
});

router.get("/:id", proveedor.getProveedorById);

// Actualizar proveedor
router.put("/:id", (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  proveedor.updateProveedor(req, res, next);
});

// Eliminar proveedor
router.delete("/:id", proveedor.deleteProveedor);

module.exports = router;
