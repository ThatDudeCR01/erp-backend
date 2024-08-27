const { body } = require("express-validator");

const empleadoValidacion = [
  // Validación y sanitización del puesto
  body("puesto")
    .notEmpty()
    .withMessage("El puesto es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El puesto debe tener entre 3 y 100 caracteres"),

  // Validación de salario (debe ser un número positivo)
  body("salario")
    .notEmpty()
    .withMessage("El salario es requerido")
    .isFloat({ min: 0 })
    .withMessage("El salario debe ser un número positivo"),

  // Validación de roles (ID de TipoEmpleado)
  body("roles")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un rol asignado")
    .custom((value) => {
      for (let i = 0; i < value.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(value[i])) {
          throw new Error(`El ID del rol en la posición ${i + 1} no es válido`);
        }
      }
      return true;
    }),
];

module.exports = empleadoValidacion;
