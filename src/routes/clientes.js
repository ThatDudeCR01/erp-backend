const express = require("express");
const {
  createCliente,
  getAllClientes,
  updateCliente,
  getClienteById,
  deleteCliente,
} = require("../controllers/cliente");
const router = express.Router();
const clienteValidacion = require("../validators/cliente");

router.get("/", getAllClientes);

router.post("/", createCliente);

router.get("/:id", getClienteById);

router.put("/:id", updateCliente);

router.delete("/:id", deleteCliente);

module.exports = router;
