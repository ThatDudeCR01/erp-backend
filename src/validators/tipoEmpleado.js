const { body } = require("express-validator");

const tipoEmpleadoValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación de precioxHora (debe ser un número positivo)
  body("precioxHora")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio por hora debe ser un número positivo"),

  // Validación de empleado_id
  body("empleado_id")
    .notEmpty()
    .withMessage("El ID del empleado es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del empleado no es válido");
      }
      return true;
    }),
];

module.exports = tipoEmpleadoValidacion;
