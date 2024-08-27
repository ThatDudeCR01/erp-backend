const { body } = require("express-validator");
const Usuario = require("../models/usuario");

const loginValidacion = [
  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .isEmail()
    .trim()
    .withMessage("Debe ser un correo electrónico válido")
    .normalizeEmail() // Convierte a minúsculas y otros cambios específicos de emails
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .custom(async (value) => {
      const usuario = await Usuario.findOne({ correo: value });
      if (usuario) {
        throw new Error("El correo ya está registrado");
      }
      return true;
    }),

  // Validación de la contraseña
  body("contraseña")
    .notEmpty()
    .trim()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6, max: 30 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[A-Za-z]/)
    .withMessage("La contraseña debe contener al menos una letra"),
  body("cedula")
    .notEmpty()
    .withMessage("La cédula es requerida")
    .isInt({ min: 100000000 })
    .withMessage(
      "La cédula debe ser un número entero positivo con al menos 9 dígitos"
    )
    .matches(/^\d+$/)
    .withMessage("La cédula debe contener solo números"),
];

module.exports = loginValidacion;
