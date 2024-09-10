const express = require("express");
const {
  getAllEmpresas,
  createEmpresa,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa,
} = require("../controllers/empresa");
const router = express.Router();

router.get("/", getAllEmpresas);

router.get("/:id", getEmpresaById);

router.post("/", createEmpresa);

router.patch("/:id", updateEmpresa);

router.delete("/:id", deleteEmpresa);

module.exports = router;
