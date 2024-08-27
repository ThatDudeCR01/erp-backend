const { body } = require("express-validator");

const productoValidacion = [
  // Validación y sanitización del nombre
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim() // Remueve espacios al inicio y al final
    .escape() // Escapa caracteres especiales (útil para evitar inyección de código)
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres"),

  // Validación del precio
  body("precio")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número mayor a 0"),

  // Validación del tipo (IDs de TipoProducto)
  body("tipo")
    .isArray({ min: 1 })
    .withMessage("Debe proporcionar al menos un tipo de producto")
    .custom((value) => {
      if (value.some((tipoId) => !mongoose.Types.ObjectId.isValid(tipoId))) {
        throw new Error("Todos los IDs de tipo deben ser ObjectId válidos");
      }
      return true;
    }),
];

module.exports = productoValidacion;