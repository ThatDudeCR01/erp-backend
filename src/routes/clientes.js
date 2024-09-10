const express = require("express");
const {
  createCliente,
  getAllClientes,
  updateCliente,
  getClienteById,
  deleteCliente,
} = require("../controllers/cliente");
const router = express.Router();
const {
  clienteValidacion,
  actualizarClienteValidacion,
  validarClienteId,
} = require("../validators/cliente");

router.get("/", getAllClientes);

router.post("/", clienteValidacion, createCliente);

router.get("/:id", getClienteById);

router.patch("/:id", actualizarClienteValidacion, updateCliente);

router.delete("/:id", validarClienteId, deleteCliente);

module.exports = router;
