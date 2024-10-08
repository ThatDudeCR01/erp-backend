const { body } = require("express-validator");
const { param } = require("express-validator");

const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  .withMessage("El nombre solo puede contener letras y espacios");

const validarCorreo = body("correo")
  .notEmpty()
  .withMessage("El correo es requerido")
  .trim()
  .isEmail()
  .withMessage("Debe ser un correo electrónico válido")
  .normalizeEmail();

const validarTieneMantenimiento = body("tieneMantenimiento")
  .notEmpty()
  .withMessage("El campo 'tieneMantenimiento' es requerido")
  .isBoolean()
  .withMessage(
    "El campo 'tieneMantenimiento' debe ser un valor booleano (true o false)"
  );

const validarClienteId = body("cliente_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de cliente")
  .isMongoId()
  .withMessage("Debe proporcionar un ID válido de MongoDB");

const validarClienteIdParams = param("id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de cliente")
  .isMongoId()
  .withMessage("Debe proporcionar un ID válido de MongoDB");

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
  validarClienteIdParams,
};
