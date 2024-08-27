const express = require("express");
const cliente = require("../controllers/cliente");
const router = express.Router();
const { validationResult } = require("express-validator");
const clienteValidacion = require("../validators/cliente");

router.get("/", cliente.getAllClientes);

router.post("/", clienteValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  cliente.createCliente(req, res, next);
});

router.get("/:id", cliente.getClienteById);

router.put("/:id", (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  cliente.updateCliente(req, res, next);
});

router.delete("/:id", cliente.deleteCliente);

module.exports = router;
