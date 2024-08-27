const express = require("express");
const horasFacturables = require("../controllers/horas-facturable");
const router = express.Router();
const { validationResult } = require("express-validator");
const horasFacturablesValidacion = require("../validators/horasFacturables");

router.get("/", horasFacturables.getAllHorasFacturables);

// Ruta para crear nuevas horas facturables, aplicando las validaciones
router.post("/", horasFacturablesValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  horasFacturables.createHorasFacturables(req, res, next);
});

router.get("/:id", horasFacturables.getHorasFacturablesById);

// Actualizar horas facturables
router.put("/:id", (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  horasFacturables.updateHorasFacturables(req, res, next);
});

// Eliminar horas facturables
router.delete("/:id", horasFacturables.deleteHorasFacturables);

module.exports = router;
