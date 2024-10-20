const express = require("express");
const router = express.Router();
const {
  crearFactura,
  getAllFacturas,
  getFacturaById,
  updateFactura,
  deleteFactura,
} = require("../controllers/factura");
const {
  facturaValidacion,
  facturaActualizacionValidacion,
} = require("../validators/factura");

router.post("/", facturaValidacion, crearFactura);

router.get("/", getAllFacturas);

router.get("/:id", getFacturaById);

router.patch("/:id", facturaActualizacionValidacion, updateFactura);

router.delete("/:id", deleteFactura);

module.exports = router;
