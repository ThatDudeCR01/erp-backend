const { body } = require("express-validator");

const entidadValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación y sanitización del apellido
  body("apellido")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage("El apellido no puede tener más de 100 caracteres"),

  // Validación y sanitización del correo
  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .trim()
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("El correo no puede tener más de 100 caracteres"),

  // Validación y sanitización del teléfono
  body("telefono")
    .optional()
    .trim()
    .escape()
    .matches(/^\d+$/)
    .withMessage("El teléfono solo puede contener números")
    .isLength({ min: 7, max: 15 })
    .withMessage("El teléfono debe tener entre 7 y 15 dígitos"),

  // Validación y sanitización de la cédula
  body("cedula")
    .notEmpty()
    .withMessage("La cédula es requerida")
    .matches(/^\d+$/)
    .withMessage("La cédula debe contener solo números")
    .isLength({ min: 9, max: 12 })
    .withMessage("La cédula debe tener entre 9 y 12 dígitos"),

  // Validación de usuario (ID de Usuario)
  body("usuario")
    .notEmpty()
    .withMessage("El ID del usuario es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del usuario no es válido");
      }
      return true;
    }),
];

module.exports = entidadValidacion;
