const { body } = require("express-validator");
const mongoose = require("mongoose");
const Entidad = require("../models/entidad");
const Cliente = require("../models/cliente");

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

const validarApellido = body("apellido")
  .notEmpty()
  .withMessage("El apellido es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El apellido debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El apellido solo puede contener letras y espacios");

// Validación para el campo correo
const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es requerido")
  .trim()
  .isEmail()
  .withMessage("Debe ser un correo electrónico válido")
  .normalizeEmail();

// Validación para el campo teléfono
const validarTelefono = body("telefono")
  .optional() // El teléfono no es obligatorio
  .trim()
  .isLength({ min: 8, max: 15 })
  .withMessage("El teléfono debe tener entre 8 y 15 caracteres")
  .matches(/^\d+$/)
  .withMessage("El teléfono solo debe contener números");

// Validación para el campo cédula
const validarCedula = body("cedula")
  .notEmpty()
  .withMessage("La cédula es requerida")
  .trim()
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

const validarClienteId = body("cliente_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de cliente")
  .custom(async (value) => {
    // Verifica si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID del cliente no es válido");
    }

    // Verifica si la entidad existe en la base de datos
    const entidadExistente = await Cliente.findById(value);
    if (!entidadExistente) {
      throw new Error("El cliente no se encontró en la base de datos");
    }

    return true;
  });

const clienteValidacion = [
  validarNombre,
  validarApellido,
  validarCorreo,
  validarTelefono,
  validarCedula,
  validarEntidadId,
];

const actualizarClienteValidacion = [
  validarNombre,
  validarApellido,
  validarTelefono,
];

module.exports = {
  clienteValidacion,
  actualizarClienteValidacion,
  validarClienteId,
};
