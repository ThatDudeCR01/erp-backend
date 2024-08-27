const express = require("express");
const template = require("../controllers/template");
const router = express.Router();
const { validationResult } = require("express-validator");
const templateValidacion = require("../validators/template");

router.get("/", template.getAllTemplates);

// Ruta para crear un nuevo template, aplicando las validaciones
router.post("/", templateValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  template.createTemplate(req, res, next);
});

router.get("/:id", template.getTemplateById);

// Actualizar template
router.put("/:id", templateValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  template.updateTemplate(req, res, next);
});

// Eliminar template
router.delete("/:id", template.deleteTemplate);

module.exports = router;
