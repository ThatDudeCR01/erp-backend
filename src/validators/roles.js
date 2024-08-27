const { body } = require("express-validator");

const rolesValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres"),

  // Validación de los permisos (deben ser un objeto)
  body("permisos")
    .notEmpty()
    .withMessage("Los permisos son requeridos")
    .isObject()
    .withMessage("Los permisos deben ser un objeto"),

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
];

module.exports = rolesValidacion;
