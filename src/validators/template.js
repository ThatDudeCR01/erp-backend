const { body } = require("express-validator");

const validarNombreTemplate = body("nombre")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres");

// Validación del array de `tareasMantenimiento`
const validarTareasMantenimiento = body("tareasMantenimiento_id")
  .optional()
  .isMongoId()
  .withMessage("Debe ser un ID de MongoDB válido");

const templateValidacion = [validarNombreTemplate, validarTareasMantenimiento];

module.exports = {
  templateValidacion,
};
