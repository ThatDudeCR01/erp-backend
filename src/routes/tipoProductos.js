const express = require("express");
const TipoProducto = require("../models/tipo-producto");
const router = express.Router();

// Crear un nuevo tipoProducto
router.post("/", async (req, res) => {
  try {
    const tipoProducto = new TipoProducto(req.body);
    await tipoProducto.save();
    res.status(201).json(tipoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los tipoProductos
router.get("/", async (req, res) => {
  try {
    const tipoProductos = await TipoProducto.find();
    res.json(tipoProductos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un tipoProducto por ID
router.get("/:id", async (req, res) => {
  try {
    const tipoProducto = await tipoProducto.findById(req.params.id);
    if (!tipoProducto)
      return res.status(404).json({ error: "tipoProducto no encontrado" });
    res.json(tipoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un tipoProducto por ID
router.put("/:id", async (req, res) => {
  try {
    const tipoProducto = await TipoProducto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tipoProducto)
      return res.status(404).json({ error: "tipoProducto no encontrado" });
    res.json(tipoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un tipoProducto por ID
router.delete("/:id", async (req, res) => {
  try {
    const tipoProducto = await TipoProducto.findByIdAndDelete(req.params.id);
    if (!tipoProducto)
      return res.status(404).json({ error: "tipoProducto no encontrado" });
    res.json({ message: "tipoProducto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
