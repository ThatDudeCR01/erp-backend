const { body } = require("express-validator");
const mongoose = require("mongoose");
const Entidad = require("../models/entidad"); // Importa el modelo de Entidad

// Validación para el campo nombre
const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es obligatorio")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

// Validación para el campo apellido (opcional)
const validarApellido = body("apellido")
  .optional()
  .trim()
  .escape()
  .isLength({ max: 100 })
  .withMessage("El apellido no puede exceder los 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/)
  .withMessage("El apellido solo puede contener letras y espacios");

// Validación para el campo correo
const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es obligatorio")
  .isEmail()
  .withMessage("Debe proporcionar un correo electrónico válido")
  .custom(async (value) => {
    const correoExistente = await Entidad.findOne({ correo: value });
    if (correoExistente) {
      throw new Error("El correo ya está registrado");
    }
    return true;
  })
  .normalizeEmail();

// Validación para el campo teléfono (opcional)
const validarTelefono = body("telefono")
  .optional()
  .trim()
  .escape()
  .matches(/^\d{8,15}$/)
  .withMessage("El teléfono debe contener entre 8 y 15 dígitos numéricos");

// Validación para el campo cédula
const validarCedula = body("cedula")
  .notEmpty()
  .withMessage("La cédula es obligatoria")
  .isNumeric()
  .withMessage("La cédula debe contener solo números")
  .isLength({ min: 9, max: 12 })
  .withMessage("La cédula debe tener entre 9 y 12 dígitos")
  .custom(async (value) => {
    const cedulaExistente = await Entidad.findOne({ cedula: value });
    if (cedulaExistente) {
      throw new Error("La cédula ya está registrada");
    }
    return true;
  });

const validarEntidadId = body("entidad_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de entidad")
  .custom(async (value) => {
    // Verifica si el ID es un ObjectId válido de MongoDB
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

// Agrupación de validaciones para la creación de una entidad
const entidadValidacion = [
  validarNombre,
  validarApellido,
  validarCorreo,
  validarTelefono,
  validarCedula,
];

const actualizarEntidadValidacion = [validarNombre, validarTelefono];

module.exports = {
  entidadValidacion,
  actualizarEntidadValidacion,
  validarEntidadId,
};
