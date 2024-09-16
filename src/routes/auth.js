const express = require("express");
const { login, passwordReset, resetPassword } = require("../controllers/auth"); // Importar el controlador de autenticación
const router = express.Router();

router.post("/", login);

router.post("/password-reset", passwordReset);

router.post("/reset-password", resetPassword);

module.exports = router;
