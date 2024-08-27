const { body } = require("express-validator");

const tipoProductoValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  // Validación y sanitización de la unidad
  body("unidad")
    .notEmpty()
    .withMessage("La unidad es requerida")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("La unidad debe tener entre 1 y 50 caracteres"),

  // Validación y sanitización de la descripción
  body("descripcion")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede tener más de 500 caracteres"),

  // Validación de producto (ID de Producto)
  body("producto")
    .notEmpty()
    .withMessage("El ID del producto es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del producto no es válido");
      }
      return true;
    }),
];

module.exports = tipoProductoValidacion;
