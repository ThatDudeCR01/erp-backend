const express = require("express");
const {
  createEmpresa,
  getAllEmpresas,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa,
} = require("../controllers/empresa");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
  empresaValidacion,
  actualizarEmpresaValidacion,
  validarEmpresaId,
} = require("../validators/empresa");

router.post("/", empresaValidacion, createEmpresa);

router.get("/", getAllEmpresas);

router.get("/:id", getEmpresaById);

router.patch("/:id", actualizarEmpresaValidacion, updateEmpresa);

router.delete("/:id", validarEmpresaId, deleteEmpresa);

module.exports = router;
