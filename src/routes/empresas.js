const express = require("express");
const {
  createEmpresa,
  getAllEmpresas,
  getEmpresaByClienteId,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa,
  changeActive,
} = require("../controllers/empresa");
const router = express.Router();

const {
  empresaValidacion,
  actualizarEmpresaValidacion,
  validarClienteIdParams,
} = require("../validators/empresa");

const { checkPermisos } = require("../middleware/auth");

router.post(
  "/",
  empresaValidacion,
  checkPermisos("Empresas/create"),
  createEmpresa
);

router.get("/", checkPermisos("Empresas/read"), getAllEmpresas);

router.get(
  "/empresas-por-cliente/:id",
  checkPermisos("Empresas/read"),
  validarClienteIdParams,
  getEmpresaByClienteId
);

router.patch("/active/:id", checkPermisos("Empresas/update"), changeActive);

router.get("/:id", checkPermisos("Empresas/read"), getEmpresaById);

router.patch(
  "/:id",
  actualizarEmpresaValidacion,
  checkPermisos("Empresas/update"),
  updateEmpresa
);

router.delete("/:id", checkPermisos("Empresas/delete"), deleteEmpresa);

module.exports = router;
