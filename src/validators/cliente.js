const { body, param } = require("express-validator");

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

const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es requerido")
  .trim()
  .isEmail()
  .withMessage("Debe ser un correo electrónico válido")
  .normalizeEmail();

const validarTelefono = body("telefono")
  .optional()
  .trim()
  .isLength({ min: 8, max: 15 })
  .withMessage("El teléfono debe tener entre 8 y 15 caracteres")
  .matches(/^\d+$/)
  .withMessage("El teléfono solo debe contener números");

const validarCedula = body("cedula")
  .notEmpty()
  .withMessage("La cédula es requerida")
  .trim()
  .matches(/^\d+$/)
  .withMessage("La cédula debe contener solo números")
  .isLength({ min: 9 })
  .withMessage("La cédula debe tener minimo 9 caracteres");

const validarEntidadId = body("entidad_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de entidad")
  .isMongoId()
  .withMessage("Invalid role ID. Must be a valid MongoDB ObjectId.");

const clienteIdValidacion = body("cliente_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de cliente")
  .isMongoId()
  .withMessage("Invalid role ID. Must be a valid MongoDB ObjectId.");

const clienteIdParamsValidacion = param("id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de cliente en la URL")
  .isMongoId()
  .withMessage("Debe ser un ObjectId válido en la URL");

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
  clienteIdValidacion,
  clienteIdParamsValidacion,
};
