const express = require("express");
const Proveedor = require("../models/proveedor");
const router = express.Router();

// Crear un nuevo proveedor
router.post("/", async (req, res) => {
  try {
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los proveedors
router.get("/", async (req, res) => {
  try {
    const proveedors = await Proveedor.find();
    res.json(proveedors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un proveedor por ID
router.get("/:id", async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor)
      return res.status(404).json({ error: "proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un proveedor por ID
router.put("/:id", async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!proveedor)
      return res.status(404).json({ error: "proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un proveedor por ID
router.delete("/:id", async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor)
      return res.status(404).json({ error: "proveedor no encontrado" });
    res.json({ message: "proveedor eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
