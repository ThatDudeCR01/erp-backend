const express = require("express");
const {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
  addRole,
  removeRole,
  changeActive,
  changeRoleActivo,
} = require("../controllers/cliente");
const router = express.Router();
const {
  clienteValidacion,
  actualizarClienteValidacion,
  clienteIdValidacion,
} = require("../validators/cliente");
const { checkPermisos } = require("../middleware/auth");

router.post(
  "/",
  clienteValidacion,
  checkPermisos("Cliente/create"),
  createCliente
);

router.get("/", checkPermisos("Cliente/read"), getAllClientes);

router.get("/:id", getClienteById);

router.patch("/:id", actualizarClienteValidacion, updateCliente);

router.delete("/:id", clienteIdValidacion, deleteCliente);

router.patch(
  "/role/:id",
  clienteIdValidacion,
  checkPermisos("Cliente/update"),
  changeRoleActivo
);

module.exports = router;
