const { body } = require("express-validator");

const tareaMantenimientoValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación y sanitización del tipo
  body("tipo")
    .notEmpty()
    .withMessage("El tipo es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage("El tipo debe tener entre 3 y 50 caracteres"),

  // Validación y sanitización de la descripción
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede tener más de 500 caracteres"),
];

module.exports = tareaMantenimientoValidacion;
