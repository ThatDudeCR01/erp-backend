const { body } = require("express-validator");
const mongoose = require("mongoose");
const Entidad = require("../models/entidad");

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

// Validación para el campo apellido
const validarApellido = body("apellido")
  .notEmpty()
  .withMessage("El apellido es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El apellido debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El apellido solo puede contener letras y espacios");

// Validación para el campo puesto
const validarPuesto = body("puesto")
  .notEmpty()
  .withMessage("El puesto es requerido")
  .trim()
  .escape()
  .isLength({ min: 4, max: 100 })
  .withMessage("El puesto debe tener entre 3 y 100 caracteres");

// Validación para el campo salario
const validarSalario = body("salario")
  .notEmpty()
  .withMessage("El salario es requerido")
  .isNumeric()
  .withMessage("El salario debe ser un número");

// Validación para el campo correo
const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es requerido")
  .trim()
  .isEmail()
  .withMessage("Debe ser un correo electrónico válido")
  .normalizeEmail();

// Validación para el campo cedula
const validarCedula = body("cedula")
  .notEmpty()
  .trim()
  .withMessage("La cédula es requerida")
  .matches(/^\d+$/)
  .withMessage("La cédula debe contener solo números")
  .isLength({ min: 9, max: 12 })
  .withMessage("La cédula debe tener entre 9 y 12 dígitos");

// Validación para el campo entidad_id
const validarEntidadId = body("entidad_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de entidad")
  .custom(async (value) => {
    // Verifica si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID de la entidad no es válido");
    }

    // Verifica si la entidad existe en la base de datos
    const entidadExistente = await Entidad.findById(value);
    if (!entidadExistente) {
      throw new Error("La entidad no se encontró en la base de datos");
    }

    return true;
  });

// Agrupación de validaciones para la creación de un empleado
const empleadoValidacion = [
  validarNombre,
  validarApellido,
  validarPuesto,
  validarSalario,
  validarCorreo,
  validarCedula,
  validarEntidadId,
];

// Agrupación de validaciones para la actualización de un empleado
const actualizarEmpleadoValidacion = [
  validarNombre,
  validarApellido,
  validarPuesto,
  validarSalario,
];

module.exports = {
  empleadoValidacion,
  actualizarEmpleadoValidacion,
};
