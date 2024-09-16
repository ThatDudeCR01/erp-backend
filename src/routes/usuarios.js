const express = require("express");
const {
  createUsuario,
  updateUsuario,
  getUsuarioById,
  deleteUsuario,
  getAllUsuarios,
  changeActive,
  changeRoleActivo,
} = require("../controllers/usuario");
const router = express.Router();
const { checkPermisos } = require("../middleware/auth");

const {
  usuarioValidacion,
  roleIdValidacion,
} = require("../validators/usuario");

router.get("/", checkPermisos("Usuarios/read"), getAllUsuarios);

router.post(
  "/",
  usuarioValidacion,
  checkPermisos("Usuarios/create"),
  createUsuario
);

router.get("/:id", checkPermisos("Usuarios/read"), getUsuarioById);

router.patch("/:id", checkPermisos("Usuarios/update"), updateUsuario);

router.patch("/active/:id", checkPermisos("Usuarios/update"), changeActive);

router.patch(
  "/role/:id",
  roleIdValidacion,
  checkPermisos("Usuarios/update"),
  changeRoleActivo
);

router.delete("/:id", checkPermisos("Usuarios/delete"), deleteUsuario);

module.exports = router;
