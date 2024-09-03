const express = require("express");
const {
  createUsuario,
  updateUsuario,
  getUsuarioById,
  deleteUsuario,
  getAllUsuarios,
} = require("../controllers/usuario");
const router = express.Router();

const usuarioValidacion = require("../validators/usuario");

router.get("/", getAllUsuarios);

router.post("/", usuarioValidacion, createUsuario);

router.get("/:id", getUsuarioById);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

module.exports = router;
