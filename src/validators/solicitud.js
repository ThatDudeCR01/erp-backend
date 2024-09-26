const { body } = require("express-validator");

const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre de la solicitud es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

const validarFechaResuelto = body("fechaResuelto")
  .notEmpty()
  .withMessage("La fecha de resolución es requerida")
  .isISO8601()
  .withMessage("Debe proporcionar una fecha válida en formato ISO8601");

const validarDescripcion = body("descripcion")
  .optional()
  .trim()
  .escape()
  .isLength({ max: 500 })
  .withMessage("La descripción no puede tener más de 500 caracteres");

const validarEstaAprobada = body("estaAprobada")
  .optional()
  .isBoolean()
  .withMessage("El valor de 'estaAprobada' debe ser booleano (true o false)");

const validarEmpleadoSolicitaId = body("empleadoSolicita_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de empleado solicitante")
  .isMongoId()
  .withMessage("Debe ser un ID de MongoDB válido");

const validarEmpleadoApruebaId = body("empleadoAprueba_id")
  .optional()
  .isMongoId()
  .withMessage("Debe ser un ID de MongoDB válido");

const solicitudValidacion = [
  validarNombre,
  validarFechaResuelto,
  validarDescripcion,
  validarEstaAprobada,
  validarEmpleadoSolicitaId,
  validarEmpleadoApruebaId,
];

module.exports = {
  solicitudValidacion,
};
