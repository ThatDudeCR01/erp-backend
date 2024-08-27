const express = require("express");
const { login } = require("../controllers/login"); // Importar el controlador de autenticación
const router = express.Router();

router.post("/", login);

module.exports = router;
