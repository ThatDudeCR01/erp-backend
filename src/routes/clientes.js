const express = require("express");
const {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
  changeActive,
} = require("../controllers/cliente");
const router = express.Router();
const {
  clienteValidacion,
  actualizarClienteValidacion,
  clienteIdValidacion,
  clienteIdParamsValidacion,
} = require("../validators/cliente");
const { checkPermisos } = require("../middleware/auth");

router.post(
  "/",
  clienteValidacion,
  checkPermisos("Clientes/create"),
  createCliente
);

router.get("/", checkPermisos("Clientes/read"), getAllClientes);

router.get("/:id", checkPermisos("Clientes/read"), getClienteById);

router.patch(
  "/:id",
  checkPermisos("Clientes/update"),
  actualizarClienteValidacion,
  updateCliente
);

router.patch(
  "/active/:id",
  clienteIdParamsValidacion,
  checkPermisos("Clientes/update"),
  changeActive
);

router.delete(
  "/:id",
  checkPermisos("Clientes/delete"),
  clienteIdValidacion,
  deleteCliente
);

module.exports = router;
