const { body } = require("express-validator");

const entidadValidacion = [
  body("nombre").notEmpty().withMessage("El nombre es requerido").trim(),

  body("apellido").optional().trim(),

  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .trim()
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido"),

  body("telefono")
    .optional()
    .trim()
    .escape()
    .matches(/^\d+$/)
    .withMessage("El teléfono solo puede contener números")
    .isLength({ min: 7, max: 15 })
    .withMessage("El teléfono debe tener entre 7 y 15 dígitos"),

  body("cedula").notEmpty().withMessage("La cédula es requerida"),
];

module.exports = entidadValidacion;
