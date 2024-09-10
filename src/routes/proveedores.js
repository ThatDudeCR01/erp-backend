const express = require("express");
const {
  createProveedor,
  getAllProveedores,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
} = require("../controllers/proveedor");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
  proveedorValidacion,
  actualizarProveedorValidacion,
} = require("../validators/proveedor");

router.post("/", proveedorValidacion, createProveedor);

router.get("/", getAllProveedores);

router.get("/:id", getProveedorById);

router.patch("/:id", actualizarProveedorValidacion, updateProveedor);

router.delete("/:id", deleteProveedor);

module.exports = router;
