const { body } = require("express-validator");
const mongoose = require("mongoose");
const Cliente = require("../models/cliente");
const Empresa = require("../models/empresa");

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

// Validación para el campo correo
const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es requerido")
  .trim()
  .isEmail()
  .withMessage("Debe ser un correo electrónico válido")
  .normalizeEmail();

// Validación para el campo tieneMantenimiento
const validarTieneMantenimiento = body("tieneMantenimiento")
  .notEmpty()
  .withMessage("El campo 'tieneMantenimiento' es requerido")
  .isBoolean()
  .withMessage(
    "El campo 'tieneMantenimiento' debe ser un valor booleano (true o false)"
  );

// Validación para el campo cliente_id
const validarClienteId = body("cliente_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de cliente")
  .custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID del cliente no es válido");
    }

    // Verifica si el cliente existe en la base de datos
    const clienteExistente = await Cliente.findById(value);
    if (!clienteExistente) {
      throw new Error("El cliente no se encontró en la base de datos");
    }

    return true;
  });

const validarEmpresaId = body("empresa_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de empresa")
  .custom(async (value) => {
    // Verifica si el ID es un ObjectId válido de MongoDB
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

module.exports = {
  validarEmpresaId,
};

// Agrupación de validaciones para la creación de una empresa
const empresaValidacion = [
  validarNombre,
  validarCorreo,
  validarTieneMantenimiento,
  validarClienteId,
];

const actualizarEmpresaValidacion = [validarNombre];

module.exports = {
  empresaValidacion,
  actualizarEmpresaValidacion,
  validarEmpresaId,
};
