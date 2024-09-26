const { body } = require("express-validator");

// Validación para el campo precio
const validarPrecio = body("precio")
  .notEmpty()
  .withMessage("El precio es obligatorio")
  .isFloat({ gt: 0 })
  .withMessage("El precio debe ser un número mayor que 0");

// Validación para el campo moneda
const validarMoneda = body("moneda")
  .notEmpty()
  .withMessage("La moneda es obligatoria")
  .isIn(["USD", "EUR", "CRC", "MXN"])
  .withMessage("La moneda debe ser una de las siguientes: USD, EUR, CRC, MXN")
  .isLength({ max: 3 })
  .withMessage("La moneda debe tener un máximo de 3 caracteres");

// Validación para el campo tipoEmpleado_id
const validarTipoEmpleadoId = body("tipoEmpleado_id")
  .notEmpty()
  .withMessage("El ID del tipo de empleado es obligatorio")
  .isMongoId()
  .withMessage("Debe proporcionar un ID válido de MongoDB");

// Agrupación de validaciones para la creación de horas facturables
const horasFacturablesValidacion = [
  validarPrecio,
  validarMoneda,
  validarTipoEmpleadoId,
];

module.exports = { horasFacturablesValidacion };
