const { body } = require("express-validator");

const horasFacturablesValidations = [
  body("id_proyecto")
    .notEmpty()
    .withMessage("El ID del proyecto es requerido")
    .isMongoId()
    .withMessage("Debe ser un ID válido de MongoDB"),
  body("id_tipoEmpleado")
    .notEmpty()
    .withMessage("El ID del tipo de empleado es requerido")
    .isMongoId()
    .withMessage("Debe ser un ID válido de MongoDB"),
  // Otras validaciones específicas de HorasFacturables
];

module.exports = horasFacturablesValidations;
