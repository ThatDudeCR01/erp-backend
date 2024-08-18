const express = require("express");
const Empresa = require("../models/empresa");
const router = express.Router();

// Crear un nuevo empresa
router.post("/", async (req, res) => {
  try {
    const empresa = new Empresa(req.body);
    await empresa.save();
    res.status(201).json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los empresas
router.get("/", async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un empresa por ID
router.get("/:id", async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa)
      return res.status(404).json({ error: "empresa no encontrado" });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un empresa por ID
router.put("/:id", async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!empresa)
      return res.status(404).json({ error: "empresa no encontrado" });
    res.json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un empresa por ID
router.delete("/:id", async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa)
      return res.status(404).json({ error: "empresa no encontrado" });
    res.json({ message: "empresa eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
