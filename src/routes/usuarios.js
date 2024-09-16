const express = require("express");
const {
  createUsuario,
  updateUsuario,
  getUsuarioById,
  deleteUsuario,
  getAllUsuarios,
} = require("../controllers/usuario");
const router = express.Router();
const { checkPermisos } = require("../middleware/auth");

const usuarioValidacion = require("../validators/usuario");

router.get("/", checkPermisos("Usuarios/read"), getAllUsuarios);

router.post(
  "/",
  usuarioValidacion,
  checkPermisos("Usuarios/create"),
  createUsuario
);

router.get("/:id", checkPermisos("Usuarios/read"), getUsuarioById);

router.put("/:id", checkPermisos("Usuarios/update"), updateUsuario);

router.delete("/:id", checkPermisos("Usuarios/delete"), deleteUsuario);

module.exports = router;
