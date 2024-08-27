const express = require("express");
const mantenimiento = require("../controllers/mantenimiento");
const router = express.Router();
const { validationResult } = require("express-validator");
const mantenimientoValidacion = require("../validators/mantenimiento");

router.get("/", mantenimiento.getAllMantenimientos);

router.post("/", mantenimientoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  mantenimiento.createMantenimiento(req, res, next);
});

router.get("/:id", mantenimiento.getMantenimientoById);

router.put("/:id", mantenimientoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  mantenimiento.updateMantenimiento(req, res, next);
});

router.delete("/:id", mantenimiento.deleteMantenimiento);

module.exports = router;
