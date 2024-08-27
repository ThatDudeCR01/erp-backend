const { body } = require("express-validator");

const empresaValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación y sanitización del correo
  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .trim()
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
    .normalizeEmail(),

  // Validación del campo tieneMantenimiento
  body("tieneMantenimiento")
    .optional()
    .isBoolean()
    .withMessage("El campo tieneMantenimiento debe ser de tipo booleano"),

  // Validación de mantenimiento_id (ID de Mantenimiento)
  body("mantenimiento_id")
    .notEmpty()
    .withMessage("El ID del mantenimiento es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del mantenimiento no es válido");
      }
      return true;
    }),
];

module.exports = empresaValidacion;
