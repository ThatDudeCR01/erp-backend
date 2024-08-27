const express = require("express");
const proyecto = require("../controllers/proyecto");
const router = express.Router();
const { validationResult } = require("express-validator");
const proyectoValidacion = require("../validators/proyecto");

router.get("/", proyecto.getAllProyectos);

// Ruta para crear un nuevo proyecto, aplicando las validaciones
router.post("/", proyectoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  proyecto.createProyecto(req, res, next);
});

router.get("/:id", proyecto.getProyectoById);

// Actualizar proyecto
router.put("/:id", proyectoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  proyecto.updateProyecto(req, res, next);
});

// Eliminar proyecto
router.delete("/:id", proyecto.deleteProyecto);

module.exports = router;
