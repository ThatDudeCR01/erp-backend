const { body } = require("express-validator");

const proyectoValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación de la duración
  body("duracion")
    .notEmpty()
    .withMessage("La duración es requerida")
    .isInt({ min: 1 })
    .withMessage("La duración debe ser un número entero positivo"),

  // Validación y sanitización de la descripción
  body("descripcion")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede tener más de 500 caracteres"),

  // Validación de empresa_id
  body("empresa_id")
    .notEmpty()
    .withMessage("El ID de la empresa es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID de la empresa no es válido");
      }
      return true;
    }),
];

module.exports = proyectoValidacion;
