const { body } = require("express-validator");
const mongoose = require("mongoose");
const Empresa = require("../models/empresa"); // Importa el modelo de Empresa
const Proyecto = require("../models/proyecto");

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

// Validación para el campo duracion
const validarDuracion = body("duracion")
  .notEmpty()
  .withMessage("La duración es requerida")
  .isInt({ gt: 0 })
  .withMessage("La duración debe ser un número entero mayor que 0");

// Validación para el campo descripcion
const validarDescripcion = body("descripcion")
  .notEmpty()
  .withMessage("La descripción es requerida")
  .trim()
  .escape()
  .isLength({ min: 10, max: 500 })
  .withMessage("La descripción debe tener entre 10 y 500 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,\.]+$/)
  .withMessage("La descripcion solo puede contener letras y espacios");

// Validación para el campo empresa_id
const validarEmpresaId = body("empresa_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de empresa")
  .custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID de la empresa no es válido");
    }

    // Verifica si la empresa existe en la base de datos
    const empresaExistente = await Empresa.findById(value);
    if (!empresaExistente) {
      throw new Error("La empresa no se encontró en la base de datos");
    }

    return true;
  });

const validarProyectoId = body("proyecto_id")
  .notEmpty()
  .withMessage("Debe proporcionar el ID de un proyecto")
  .custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID del proyecto no es válido");
    }

    // Verifica si la empresa existe en la base de datos
    const empresaExistente = await Proyecto.findById(value);
    if (!empresaExistente) {
      throw new Error("El proyecto no se encontró en la base de datos");
    }

    return true;
  });

// Agrupación de validaciones para la creación de un proyecto
const proyectoValidacion = [
  validarNombre,
  validarDuracion,
  validarDescripcion,
  validarEmpresaId,
];

const actualizarProductoValidacion = [
  validarNombre,
  validarDuracion,
  validarDescripcion,
];

module.exports = {
  proyectoValidacion,
  actualizarProductoValidacion,
  validarProyectoId,
};
