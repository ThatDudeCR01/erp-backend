const { body } = require("express-validator");

// Validación y sanitización del nombre
const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

// Validación de horasFacturables_id (debe ser un ID de MongoDB)
const validarHorasFacturablesId = body("horasFacturables_id")
  .notEmpty()
  .withMessage("El ID de horas facturables es requerido")
  .isMongoId()
  .withMessage("Debe ser un ID de MongoDB válido");

// Validación del array tarifa (debe ser un array)
const validarTarifaArray = body("tarifa")
  .isArray({ min: 1 })
  .withMessage("Debe incluir al menos una tarifa")
  .optional();

// Validación de cada precio dentro de tarifa (debe ser un número positivo)
const validarTarifaPrecio = body("tarifa.*.precio")
  .notEmpty()
  .withMessage("El precio de la tarifa es requerido")
  .isFloat({ min: 0 })
  .withMessage("El precio de la tarifa debe ser un número positivo");

// Validación de cada descripción dentro de tarifa
const validarTarifaDescripcion = body("tarifa.*.descripcion")
  .notEmpty()
  .withMessage("La descripción de la tarifa es requerida")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("La descripción debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

// Array de validaciones
const tipoEmpleadoValidacion = [
  validarNombre,
  validarHorasFacturablesId,
  validarTarifaArray,
  validarTarifaPrecio,
  validarTarifaDescripcion,
];

const tipoEmpleadoActualizacionValidacion = [
  validarNombre.optional(),
  validarTarifaPrecio.optional(),
  validarTarifaDescripcion.optional(),
];

module.exports = {
  tipoEmpleadoValidacion,
  tipoEmpleadoActualizacionValidacion,
};
