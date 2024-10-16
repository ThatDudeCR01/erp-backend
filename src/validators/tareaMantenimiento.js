const { body } = require("express-validator");

const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

const validarTipo = body("tipo")
  .notEmpty()
  .withMessage("El tipo es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 50 })
  .withMessage("El tipo debe tener entre 3 y 50 caracteres");

const validarDescripcion = body("descripcion")
  .notEmpty()
  .withMessage("La descripción es requerida")
  .trim()
  .escape()
  .isLength({ max: 500 })
  .withMessage("La descripción no puede tener más de 500 caracteres");

const validarDuracion = body("duracion")
  .notEmpty()
  .withMessage("La duración es requerida")
  .trim()
  .escape();
// .matches(/^\d+(\.\d+)? (horas|minutos)$/i)
// .withMessage("La duración debe estar en el formato 'n horas' o 'n minutos'");

const validarFechaCobro = body("fecha_cobro")
  .notEmpty()
  .withMessage("La fecha de cobro es requerida")
  .isISO8601()
  .withMessage(
    "La fecha de cobro debe estar en un formato de fecha válido (ISO8601)"
  );

const validarTemplateId = body("template_id")
  .notEmpty()
  .withMessage("El template_id es requerido")
  .isMongoId()
  .withMessage("El template_id debe ser un ID de MongoDB válido");

const validarTareaMantenimiento = [
  validarNombre,
  validarTipo,
  validarDescripcion,
  validarFechaCobro,
  validarDuracion,
  validarTemplateId,
];

const validarTareaMantenimientoUpdate = [
  validarNombre.optional(),
  validarDescripcion.optional(),
  validarTipo.optional(),
  validarDuracion.optional(),
  validarFechaCobro.optional(),
];

module.exports = {
  validarTareaMantenimiento,
  validarTareaMantenimientoUpdate,
};
