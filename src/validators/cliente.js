const { body } = require("express-validator");
const mongoose = require("mongoose");

const clienteValidacion = [
  // Validación de los campos heredados de Entidad
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .trim()
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
    .normalizeEmail(),

  body("cedula")
    .notEmpty()
    .withMessage("La cédula es requerida")
    .matches(/^\d+$/)
    .withMessage("La cédula debe contener solo números")
    .isLength({ min: 9, max: 12 })
    .withMessage("La cédula debe tener entre 9 y 12 dígitos"),

  body("usuario")
    .notEmpty()
    .withMessage("El ID del usuario es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del usuario no es válido");
      }
      return true;
    }),

  // Validación del campo específico de Cliente
  body("entidad_id")
    .notEmpty()
    .withMessage("El ID de la entidad es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID de la entidad no es válido");
      }
      return true;
    }),
];

module.exports = clienteValidacion;
