const express = require("express");
const Template = require("../models/template");
const router = express.Router();

// Crear un nuevo template
router.post("/", async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un template por ID
router.get("/:id", async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template)
      return res.status(404).json({ error: "template no encontrado" });
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un template por ID
router.put("/:id", async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!template)
      return res.status(404).json({ error: "template no encontrado" });
    res.json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un template por ID
router.delete("/:id", async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template)
      return res.status(404).json({ error: "template no encontrado" });
    res.json({ message: "template eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
