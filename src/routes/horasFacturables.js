const express = require("express");
const HorasFacturables = require("../models/horasFacturables");
const router = express.Router();

// Crear una nueva hora facturable
router.post("/", async (req, res) => {
  try {
    const horasFacturables = new HorasFacturables(req.body);
    await horasFacturables.save();
    res.status(201).json(horasFacturables);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todas las horas facturables
router.get("/", async (req, res) => {
  try {
    const horasFacturables = await HorasFacturables.find();
    res.json(horasFacturables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer una hora facturable por ID
router.get("/:id", async (req, res) => {
  try {
    const horasFacturables = await HorasFacturables.findById(req.params.id);
    if (!horasFacturables)
      return res
        .status(404)
        .json({ error: "Horas facturables no encontradas" });
    res.json(horasFacturables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una hora facturable por ID
router.put("/:id", async (req, res) => {
  try {
    const horasFacturables = await HorasFacturables.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!horasFacturables)
      return res
        .status(404)
        .json({ error: "Horas facturables no encontradas" });
    res.json(horasFacturables);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una hora facturable por ID
router.delete("/:id", async (req, res) => {
  try {
    const horasFacturables = await HorasFacturables.findByIdAndDelete(
      req.params.id
    );
    if (!horasFacturables)
      return res
        .status(404)
        .json({ error: "Horas facturables no encontradas" });
    res.json({ message: "Horas facturables eliminadas" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
