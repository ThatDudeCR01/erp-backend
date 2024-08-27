const { body } = require("express-validator");

const solicitudValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación de la fecha
  body("fecha")
    .notEmpty()
    .withMessage("La fecha es requerida")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido"),

  // Validación de estado de aprobación
  body("estaAprobada")
    .optional()
    .isBoolean()
    .withMessage("El estado de aprobación debe ser verdadero o falso"),

  // Validación de empleadoSolicita
  body("empleadoSolicita")
    .notEmpty()
    .withMessage("El ID del empleado que solicita es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del empleado no es válido");
      }
      return true;
    }),

  // Validación de usuario_id
  body("usuario_id")
    .notEmpty()
    .withMessage("El ID del usuario es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del usuario no es válido");
      }
      return true;
    }),
];

module.exports = solicitudValidacion;
