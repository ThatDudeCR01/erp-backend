const { body } = require("express-validator");
const mongoose = require("mongoose");

const mantenimientoValidacion = [
  // Validación del campo id_empresa (ID de Empresa)
  body("id_empresa")
    .notEmpty()
    .withMessage("El ID de la empresa es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID de la empresa no es válido");
      }
      return true;
    }),

  // Validación del campo template_id (ID de Template)
  body("template_id")
    .notEmpty()
    .withMessage("El ID del template es requerido")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("El ID del template no es válido");
      }
      return true;
    }),
];

module.exports = mantenimientoValidacion;
