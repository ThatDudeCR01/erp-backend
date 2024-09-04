const { body } = require("express-validator");
const mongoose = require("mongoose");

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

const validarIdentificacion = body("identificacion")
  .notEmpty()
  .trim()
  .withMessage("La cédula es requerida")
  .matches(/^\d+$/)
  .withMessage("La cédula debe contener solo números")
  .isLength({ min: 9, max: 12 })
  .withMessage("La cédula debe tener entre 9 y 12 dígitos");

const validarEntidadId = body("entidad_id")
  .notEmpty()
  .withMessage("El ID de la entidad es requerido")
  .custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID de la entidad no es válido");
    }
    return true;
  });

const validarTelefono = body("telefono")
  .notEmpty()
  .withMessage("El teléfono es requerido")
  .trim()
  .isLength({ min: 8, max: 10 })
  .withMessage("El teléfono debe tener entre 8 y 15 caracteres")
  .matches(/^\d+$/)
  .withMessage("El teléfono solo debe contener números");

const contacto = [
  validarNombre,
  validarCorreo,
  validarIdentificacion,
  validarEntidadId,
  validarTelefono,
];

const actualizarContacto = [validarNombre, validarTelefono];

module.exports = {
  contacto,
  actualizarContacto,
};
