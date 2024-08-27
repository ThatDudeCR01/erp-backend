const { body } = require("express-validator");
const Usuario = require("../models/usuario");

const usuarioValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim() // Remover espacios al inicio y al final
    .escape() // Escapar caracteres especiales (útil para evitar inyección de código)
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo puede contener letras")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres"),

  // Validación y sanitización del correo
  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .isEmail()
    .trim()
    .withMessage("Debe ser un correo electrónico válido")
    .normalizeEmail() // Convierte a minúsculas y otros cambios específicos de emails
    .isLength({ max: 30 })
    .withMessage("El correo debe ser menor a 30 caractares")
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
    ),
];

module.exports = usuarioValidacion;
