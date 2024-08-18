const express = require("express");
const Proyecto = require("../models/proyecto");
const router = express.Router();

// Crear un nuevo proyecto
router.post("/", async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);
    await proyecto.save();
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los proyectos
router.get("/", async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un proyecto por ID
router.get("/:id", async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "proyecto no encontrado" });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un proyecto por ID
router.put("/:id", async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!proyecto)
      return res.status(404).json({ error: "proyecto no encontrado" });
    res.json(proyecto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un proyecto por ID
router.delete("/:id", async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "proyecto no encontrado" });
    res.json({ message: "proyecto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
