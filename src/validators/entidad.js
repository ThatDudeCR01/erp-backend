const { body } = require("express-validator");

const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es obligatorio")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

const validarApellido = body("apellido")
  .optional()
  .trim()
  .escape()
  .isLength({ max: 100 })
  .withMessage("El apellido no puede exceder los 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/)
  .withMessage("El apellido solo puede contener letras y espacios");

const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es obligatorio")
  .isEmail()
  .withMessage("Debe proporcionar un correo electrónico válido");

const validarTelefono = body("telefono")
  .optional()
  .trim()
  .escape()
  .matches(/^\d{8,15}$/)
  .withMessage("El teléfono debe contener entre 8 y 15 dígitos numéricos");

const validarCedula = body("cedula")
  .notEmpty()
  .withMessage("La cédula es obligatoria")
  .isNumeric()
  .withMessage("La cédula debe contener solo números")
  .isLength({ min: 9 })
  .withMessage("La cédula debe tener minimo 9 caracteres");

const validarEntidadId = body("entidad_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de entidad");

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
