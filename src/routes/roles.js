const express = require("express");
const Roles = require("../models/roles");
const router = express.Router();

// Crear un nuevo rol
router.post("/", async (req, res) => {
  try {
    const rol = new Roles(req.body);
    await rol.save();
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los roles
router.get("/", async (req, res) => {
  try {
    const roles = await Roles.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un rol por ID
router.get("/:id", async (req, res) => {
  try {
    const rol = await Roles.findById(req.params.id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un rol por ID
router.put("/:id", async (req, res) => {
  try {
    const rol = await Roles.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un rol por ID
router.delete("/:id", async (req, res) => {
  try {
    const rol = await Roles.findByIdAndDelete(req.params.id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json({ message: "Rol eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
