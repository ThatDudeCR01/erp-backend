const { body } = require("express-validator");
const mongoose = require("mongoose");

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

// Validación para el campo unidad
const validarUnidad = body("unidad")
  .notEmpty()
  .withMessage("La unidad es requerida")
  .trim()
  .escape()
  .isIn([
    "unidad",
    "gramo",
    "kilogramos",
    "onza",
    "litro",
    "mililitro",
    "onza",
    "centímetro",
    "metro",
    "pulgada",
    "metro cuadrado",
  ])
  .withMessage(
    "La unidad debe ser uno de los siguientes valores: unidad, kilogramos, gramo, onza, litro, mililitro, onza, centímetro, metro, pulgada, metro cuadrado"
  );

module.exports = {
  validarUnidad,
};

const validarDescripcion = body("descripcion")
  .optional()
  .trim()
  .escape()
  .isLength({ max: 250 })
  .withMessage("La descripción no puede tener más de 250 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

const tipoProductoValidacion = [
  validarNombre,
  validarUnidad,
  validarDescripcion,
];

const actualizarTipoProductoValidacion = [
  validarNombre,
  validarUnidad,
  validarDescripcion,
];

module.exports = {
  tipoProductoValidacion,
  actualizarTipoProductoValidacion,
};
