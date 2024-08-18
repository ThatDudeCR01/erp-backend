const express = require("express");
const Solicitudes = require("../models/solicitudes");
const router = express.Router();

// Crear un nuevo solicitudes
router.post("/", async (req, res) => {
  try {
    const solicitudes = new Solicitudes(req.body);
    await solicitudes.save();
    res.status(201).json(solicitudes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los solicitudess
router.get("/", async (req, res) => {
  try {
    const solicitudess = await Solicitudes.find();
    res.json(solicitudess);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un solicitudes por ID
router.get("/:id", async (req, res) => {
  try {
    const solicitudes = await Solicitudes.findById(req.params.id);
    if (!solicitudes)
      return res.status(404).json({ error: "solicitudes no encontrado" });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un solicitudes por ID
router.put("/:id", async (req, res) => {
  try {
    const solicitudes = await Solicitudes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!solicitudes)
      return res.status(404).json({ error: "solicitudes no encontrado" });
    res.json(solicitudes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un solicitudes por ID
router.delete("/:id", async (req, res) => {
  try {
    const solicitudes = await Solicitudes.findByIdAndDelete(req.params.id);
    if (!solicitudes)
      return res.status(404).json({ error: "solicitudes no encontrado" });
    res.json({ message: "solicitudes eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
