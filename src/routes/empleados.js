const express = require("express");
const Empleado = require("../models/empleado");
const router = express.Router();

// Crear un nuevo empleado
router.post("/", async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).json(empleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los empleados
router.get("/", async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un empleado por ID
router.get("/:id", async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado)
      return res.status(404).json({ error: "Empleado no encontrado" });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un empleado por ID
router.put("/:id", async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!empleado)
      return res.status(404).json({ error: "Empleado no encontrado" });
    res.json(empleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un empleado por ID
router.delete("/:id", async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado)
      return res.status(404).json({ error: "Empleado no encontrado" });
    res.json({ message: "Empleado eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
