const { body } = require("express-validator");
const mongoose = require("mongoose");
const TareaMantenimiento = require("../models/tarea-mantenimiento"); // Asegúrate de importar el modelo de TareaMantenimiento

// Validación para el campo nombre
const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

// Validación para el campo tipo
const validarTipo = body("tipo")
  .notEmpty()
  .withMessage("El tipo es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El tipo debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El tipo solo puede contener letras y espacios");

// Validación para el campo descripcion
const validarDescripcion = body("descripcion")
  .notEmpty()
  .withMessage("La descripción es requerida")
  .trim()
  .escape()
  .isLength({ max: 500 })
  .withMessage("La descripción no puede tener más de 500 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,\.]+$/)
  .withMessage(
    "La descripción solo puede contener letras, espacios, comas y puntos"
  );

// Validación para verificar que una tarea de mantenimiento exista antes de ser eliminada
const validarTareaMantenimientoId = body("id")
  .notEmpty()
  .withMessage("Debe proporcionar el ID de una solicutud")
  .custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID de la tarea de mantenimiento no es válido");
    }

    // Verifica si la tarea de mantenimiento existe en la base de datos
    const tareaExistente = await TareaMantenimiento.findById(value);
    if (!tareaExistente) {
      throw new Error(
        "La tarea de mantenimiento no se encontró en la base de datos"
      );
    }

    return true;
  });

// Agrupación de validaciones para la creación de una tarea de mantenimiento
const tareaMantenimientoValidacion = [
  validarNombre,
  validarTipo,
  validarDescripcion,
];

// Agrupación de validaciones para eliminar una tarea de mantenimiento
const actualizarTareaMantenimientoValidacion = [
  validarNombre,
  validarTipo,
  validarDescripcion,
];

module.exports = {
  tareaMantenimientoValidacion,
  actualizarTareaMantenimientoValidacion,
  validarTareaMantenimientoId,
};
