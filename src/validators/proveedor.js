const { body } = require("express-validator");

const proveedorValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim() // Remueve espacios al inicio y al final
    .escape() // Escapa caracteres especiales
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres"),

  // Validación del correo
  body("correo")
    .notEmpty()
    .withMessage("El correo es requerido")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
    .normalizeEmail(), // Convierte a minúsculas y otros cambios específicos de emails

  // Validación del teléfono
  body("telefono")
    .optional() // Teléfono es opcional
    .trim()
    .matches(/^[0-9]{8,15}$/)
    .withMessage(
      "El teléfono debe tener entre 8 y 15 dígitos y solo contener números"
    ),

  // Validación de la cédula
  body("cedula")
    .notEmpty()
    .withMessage("La cédula es requerida")
    .isLength({ min: 9, max: 12 })
    .withMessage("La cédula debe tener entre 9 y 12 caracteres")
    .isNumeric()
    .withMessage("La cédula debe contener solo números"),

  // Validación de empresa
  body("empresa")
    .notEmpty()
    .withMessage("El nombre de la empresa es requerido")
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre de la empresa debe tener entre 2 y 100 caracteres"),

  // Validación de entidad_id (IDs de Entidad)
  body("entidad_id")
    .isArray({ min: 1 })
    .withMessage("Debe proporcionar al menos una entidad asociada")
    .custom((value) => {
      if (
        value.some((entidadId) => !mongoose.Types.ObjectId.isValid(entidadId))
      ) {
        throw new Error("Todos los IDs de entidad deben ser ObjectId válidos");
      }
      return true;
    }),
];

module.exports = proveedorValidacion;
