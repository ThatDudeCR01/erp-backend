const { body } = require("express-validator");

const templateValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación de tareasMantenimiento (ID de TareaMantenimiento)
  body("tareasMantenimiento")
    .notEmpty()
    .withMessage("El ID de tareas de mantenimiento es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID de tareas de mantenimiento no es válido");
      }
      return true;
    }),
];

module.exports = templateValidacion;
