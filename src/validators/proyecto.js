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

const validarDuracion = body("duracion")
  .notEmpty()
  .withMessage("La duración es requerida")
  .isInt({ gt: 0 })
  .withMessage("La duración debe ser un número entero mayor que 0");

const validarDescripcion = body("descripcion")
  .notEmpty()
  .withMessage("La descripción es requerida")
  .trim()
  .escape()
  .isLength({ min: 10, max: 500 })
  .withMessage("La descripción debe tener entre 10 y 500 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,\.]+$/)
  .withMessage("La descripcion solo puede contener letras y espacios");

const validarReferencia = body("referencia")
  .notEmpty()
  .withMessage("La referencia es obligatoria")
  .isMongoId()
  .withMessage("La referencia debe ser un ID válido de MongoDB");

const validarReferenciaModelo = body("referenciaModelo")
  .notEmpty()
  .withMessage("El modelo de referencia es obligatorio")
  .isIn(["Cliente", "Empresa"])
  .withMessage("El modelo de referencia debe ser 'Cliente' o 'Empresa'");

const validarHorasFacturableId = body("horas_facturable_id")
  .notEmpty()
  .withMessage("El ID de horas facturables es obligatorio")
  .isMongoId()
  .withMessage("El ID de horas facturables debe ser un ID válido de MongoDB");

const proyectoValidacion = [
  validarNombre,
  validarDuracion,
  validarDescripcion,
  validarReferencia,
  validarReferenciaModelo,
  validarHorasFacturableId,
];

const actualizarProductoValidacion = [
  validarNombre.optional(),
  validarDuracion.optional(),
  validarDescripcion.optional(),
];

module.exports = {
  proyectoValidacion,
  actualizarProductoValidacion,
};
