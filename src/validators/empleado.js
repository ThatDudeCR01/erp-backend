const { body } = require("express-validator");

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

const validarPuesto = body("puesto")
  .notEmpty()
  .withMessage("El puesto es requerido")
  .trim()
  .escape()
  .isLength({ min: 4, max: 100 })
  .withMessage("El puesto debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El apellido solo puede contener letras y espacios");

const validarSalario = body("salario")
  .notEmpty()
  .withMessage("El salario es requerido")
  .isNumeric()
  .withMessage("El salario debe ser un número")
  .isFloat({ gt: 0 })
  .withMessage("El salario debe ser un número positivo");

const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es requerido")
  .trim()
  .isEmail()
  .withMessage("Debe ser un correo electrónico válido")
  .normalizeEmail();

const validarCedula = body("cedula")
  .notEmpty()
  .trim()
  .withMessage("La cédula es requerida")
  .matches(/^\d+$/)
  .withMessage("La cédula debe contener solo números")
  .isLength({ min: 9 })
  .withMessage("La cédula debe tener minimo 9 caracteres");

const validarEntidadId = body("entidad_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de entidad")
  .isMongoId()
  .withMessage("Debe proporcionar un ID válido de MongoDB");

const empleadoValidacion = [
  validarNombre,
  validarApellido,
  validarPuesto,
  validarSalario,
  validarCorreo,
  validarCedula,
  validarEntidadId,
];

const actualizarEmpleadoValidacion = [
  validarNombre.optional(),
  validarApellido.optional(),
  validarPuesto.optional(),
  validarSalario.optional(),
];

module.exports = {
  empleadoValidacion,
  actualizarEmpleadoValidacion,
};
