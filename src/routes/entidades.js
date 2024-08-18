const express = require("express");
const Entidad = require("../models/entidad");
const router = express.Router();

// Crear una nueva entidad
router.post("/", async (req, res) => {
  try {
    const entidad = new Entidad(req.body);
    await entidad.save();
    res.status(201).json(entidad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todas las entidades
router.get("/", async (req, res) => {
  try {
    const entidades = await Entidad.find();
    res.json(entidades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer una entidad por ID
router.get("/:id", async (req, res) => {
  try {
    const entidad = await Entidad.findById(req.params.id);
    if (!entidad)
      return res.status(404).json({ error: "Entidad no encontrada" });
    res.json(entidad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una entidad por ID
router.put("/:id", async (req, res) => {
  try {
    const entidad = await Entidad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!entidad)
      return res.status(404).json({ error: "Entidad no encontrada" });
    res.json(entidad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una entidad por ID
router.delete("/:id", async (req, res) => {
  try {
    const entidad = await Entidad.findByIdAndDelete(req.params.id);
    if (!entidad)
      return res.status(404).json({ error: "Entidad no encontrada" });
    res.json({ message: "Entidad eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
