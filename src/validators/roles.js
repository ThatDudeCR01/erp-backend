const { body } = require("express-validator");

const rolesValidacion = [
  body("nombre").notEmpty().withMessage("El nombre es requerido").trim(),

  body("permisos")
    .notEmpty()
    .withMessage("Los permisos son requeridos")
    .isArray()
    .withMessage("Los permisos deben ser un arreglo"),
];

module.exports = rolesValidacion;
