const express = require("express");
const empresa = require("../controllers/empresa");
const router = express.Router();
const { validationResult } = require("express-validator");
const empresaValidacion = require("../validators/empresa");

router.get("/", empresa.getAllEmpresas);

// Ruta para crear una nueva empresa, aplicando las validaciones
router.post("/", empresaValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  empresa.createEmpresa(req, res, next);
});

router.get("/:id", empresa.getEmpresaById);

// Actualizar una empresa
router.put("/:id", empresaValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  empresa.updateEmpresa(req, res, next);
});

// Eliminar una empresa
router.delete("/:id", empresa.deleteEmpresa);

module.exports = router;
