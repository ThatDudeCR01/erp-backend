const express = require("express");
const Contacto = require("../models/contacto");
const router = express.Router();

// Crear un nuevo contacto
router.post("/", async (req, res) => {
  try {
    const contacto = new Contacto(req.body);
    await contacto.save();
    res.status(201).json(contacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los contactos
router.get("/", async (req, res) => {
  try {
    const contactos = await Contacto.find();
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un contacto por ID
router.get("/:id", async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto)
      return res.status(404).json({ error: "Contacto no encontrado" });
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un contacto por ID
router.put("/:id", async (req, res) => {
  try {
    const contacto = await Contacto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contacto)
      return res.status(404).json({ error: "Contacto no encontrado" });
    res.json(contacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un contacto por ID
router.delete("/:id", async (req, res) => {
  try {
    const contacto = await Contacto.findByIdAndDelete(req.params.id);
    if (!contacto)
      return res.status(404).json({ error: "Contacto no encontrado" });
    res.json({ message: "Contacto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
