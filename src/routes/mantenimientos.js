const express = require("express");
const Mantenimiento = require("../models/mantenimiento");
const router = express.Router();

// Crear un nuevo mantenimiento
router.post("/", async (req, res) => {
  try {
    const mantenimiento = new Mantenimiento(req.body);
    await mantenimiento.save();
    res.status(201).json(mantenimiento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los mantenimientos
router.get("/", async (req, res) => {
  try {
    const mantenimientos = await Mantenimiento.find();
    res.json(mantenimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un mantenimiento por ID
router.get("/:id", async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);
    if (!mantenimiento)
      return res.status(404).json({ error: "Mantenimiento no encontrado" });
    res.json(mantenimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un mantenimiento por ID
router.put("/:id", async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!mantenimiento)
      return res.status(404).json({ error: "Mantenimiento no encontrado" });
    res.json(mantenimiento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un mantenimiento por ID
router.delete("/:id", async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findByIdAndDelete(req.params.id);
    if (!mantenimiento)
      return res.status(404).json({ error: "Mantenimiento no encontrado" });
    res.json({ message: "Mantenimiento eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
