const { body } = require("express-validator");

const usuarioValidacion = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),

  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .isEmail()
    .trim()
    .withMessage("Debe ser un correo electrónico válido")
    .toLowerCase(),

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

const roleIdValidacion = [
  body("role_id")
    .isMongoId()
    .withMessage("Invalid role ID. Must be a valid MongoDB ObjectId."),
];

module.exports = { usuarioValidacion, roleIdValidacion };
