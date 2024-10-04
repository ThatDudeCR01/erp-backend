const { body } = require("express-validator");

const mantenimientoValidacion = [
  // Validación del campo id_empresa (ID de Empresa)
  body("empresa_id")
    .notEmpty()
    .withMessage("El ID de la empresa es requerido")
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB válido"),

  // Validación del campo template_id (ID de Template)
  body("template_id")
    .notEmpty()
    .withMessage("El ID del template es requerido")
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB válido"),
];

module.exports = mantenimientoValidacion;
