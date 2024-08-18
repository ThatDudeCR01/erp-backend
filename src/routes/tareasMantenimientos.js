const express = require("express");
const TareasMantenimientos = require("../models/tarea-tareasMantenimiento");
const router = express.Router();

// Crear un nuevo tareasMantenimiento
router.post("/", async (req, res) => {
  try {
    const tareasMantenimientos = new TareasMantenimientos(req.body);
    await tareasMantenimientos.save();
    res.status(201).json(tareasMantenimientos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los tareasMantenimientos
router.get("/", async (req, res) => {
  try {
    const tareasMantenimientos = await TareasMantenimientos.find();
    res.json(tareasMantenimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un tareasMantenimiento por ID
router.get("/:id", async (req, res) => {
  try {
    const tareasMantenimientos = await TareasMantenimientos.findById(
      req.params.id
    );
    if (!tareasMantenimientos)
      return res
        .status(404)
        .json({ error: "tareasMantenimiento no encontrado" });
    res.json(tareasMantenimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un tareasMantenimiento por ID
router.put("/:id", async (req, res) => {
  try {
    const tareasMantenimientos = await TareasMantenimientos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tareasMantenimientos)
      return res
        .status(404)
        .json({ error: "tareasMantenimiento no encontrado" });
    res.json(tareasMantenimientos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un tareasMantenimiento por ID
router.delete("/:id", async (req, res) => {
  try {
    const tareasMantenimientos = await TareasMantenimientos.findByIdAndDelete(
      req.params.id
    );
    if (!tareasMantenimientos)
      return res
        .status(404)
        .json({ error: "tareasMantenimiento no encontrado" });
    res.json({ message: "tareasMantenimiento eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
