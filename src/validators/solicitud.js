const { body } = require("express-validator");
const mongoose = require("mongoose");
const Empleado = require("../models/empleado"); // Importa el modelo de Empleado
const Usuario = require("../models/usuario"); // Importa el modelo de Usuario
const Solicitud = require("../models/solicitudes"); // Importa el modelo de Usuario

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

// Validación para el campo fecha
const validarFecha = body("fecha")
  .optional() // Opcional ya que si no se proporciona se asigna la fecha de hoy
  .isISO8601()
  .withMessage("La fecha debe ser una fecha válida en formato ISO8601")
  .toDate(); // Convierte la fecha en un objeto Date

// Validación para el campo descripcion
const validarDescripcion = body("descripcion")
  .optional()
  .trim()
  .escape()
  .isLength({ max: 500 })
  .withMessage("La descripción no puede tener más de 500 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,\.]*$/)
  .withMessage(
    "La descripción solo puede contener letras, espacios, comas y puntos"
  );

// Validación para el campo estaAprobada
const validarEstaAprobada = body("estaAprobada")
  .optional()
  .isBoolean()
  .withMessage(
    "El campo 'estaAprobada' debe ser un valor booleano (true o false)"
  );

// Validación para el campo empleadoSolicita_id
const validarEmpleadoSolicitaId = body("empleadoSolicita_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de empleado solicitante")
  .custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID del empleado solicitante no es válido");
    }

    // Verifica si el empleado existe en la base de datos
    const empleadoExistente = await Empleado.findById(value);
    if (!empleadoExistente) {
      throw new Error(
        "El empleado solicitante no se encontró en la base de datos"
      );
    }

    return true;
  });

// Validación para el campo empleadoAprueba_id
const validarEmpleadoApruebaId = body("empleadoAprueba_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de empleado aprobador")
  .custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID del empleado aprobador no es válido");
    }

    // Verifica si el usuario (empleado aprobador) existe en la base de datos
    const usuarioExistente = await Usuario.findById(value);
    if (!usuarioExistente) {
      throw new Error(
        "El usuario aprobador no se encontró en la base de datos"
      );
    }

    return true;
  });

const validarSolicitudId = body("solicitud_id")
  .notEmpty()
  .withMessage("Debe proporcionar el ID de una solicutud")
  .custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID de la solicitud  no es válido");
    }

    // Verifica si el usuario (empleado aprobador) existe en la base de datos
    const usuarioExistente = await Solicitud.findById(value);
    if (!usuarioExistente) {
      throw new Error("La solicitud no se encontró en la base de datos");
    }

    return true;
  });

// Agrupación de validaciones para la creación de una solicitud
const solicitudValidacion = [
  validarNombre,
  validarFecha,
  validarDescripcion,
  validarEstaAprobada,
  validarEmpleadoSolicitaId,
  validarEmpleadoApruebaId,
];

const actualizarSolicitudValidacion = [
  validarNombre,
  validarDescripcion,
  validarEstaAprobada,
];

module.exports = {
  solicitudValidacion,
  actualizarSolicitudValidacion,
  validarSolicitudId,
};
