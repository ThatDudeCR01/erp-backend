const { body } = require("express-validator");

const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
  .withMessage("El nombre solo puede contener letras, números y espacios");

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
  .withMessage("Debe proporcionar un ID válido de MongoDB");

const proveedorValidacion = [
  validarNombre,
  validarCorreo,
  validarTelefono,
  validarCedula,
  validarEntidadId,
];

const actualizarProveedorValidacion = [validarNombre, validarTelefono];

module.exports = {
  proveedorValidacion,
  actualizarProveedorValidacion,
};
