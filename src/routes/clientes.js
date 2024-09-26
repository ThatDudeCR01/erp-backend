const express = require("express");
const {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
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
  checkPermisos("Clientes/create"),
  createCliente
);

router.get("/", checkPermisos("Clientes/read"), getAllClientes);

router.patch(
  "/active/:id",
  checkPermisos("Clientes/update"),
  actualizarClienteValidacion,
  updateCliente
);

router.get("/:id", checkPermisos("Clientes/read"), getClienteById);

router.patch(
  "/:id",
  checkPermisos("Clientes/update"),
  actualizarClienteValidacion,
  updateCliente
);

router.delete(
  "/:id",
  checkPermisos("Clientes/delete"),
  clienteIdValidacion,
  deleteCliente
);

module.exports = router;
