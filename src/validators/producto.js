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

const validarPrecio = body("precio")
  .notEmpty()
  .withMessage("El precio es requerido")
  .isFloat({ gt: 0 })
  .withMessage("El precio debe ser un número mayor que 0")
  .isNumeric()
  .withMessage("El precio solo debe contener números");

const validarDescripcion = body("descripcion")
  .notEmpty()
  .withMessage("La descripción es requerida")
  .trim()
  .escape()
  .isLength({ min: 10, max: 500 })
  .withMessage("La descripción debe tener entre 10 y 500 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
  .withMessage("El nombre solo puede contener letras, números y espacios");

const validarCantidad = body("cantidad")
  .notEmpty()
  .withMessage("La cantidad es requerida")
  .isInt({ min: 0 })
  .withMessage("La cantidad debe ser un número entero mayor o igual a 0");

const validarPuntoReorden = body("punto_reorden")
  .notEmpty()
  .withMessage("El punto de reorden es requerido")
  .isInt({ min: 0 })
  .withMessage(
    "El punto de reorden debe ser un número entero mayor o igual a 0"
  );

const validarEsServicio = body("es_servicio")
  .isBoolean()
  .withMessage("El valor debe ser verdadero o falso");

const validarTipoProductoId = body("tipoProducto_id")
  .notEmpty()
  .withMessage("El ID del template es requerido")
  .isMongoId()
  .withMessage("Debe ser un ID de MongoDB válido");

const validarProveedorId = body("proveedor_id")
  .notEmpty()
  .withMessage("El ID del template es requerido")
  .isMongoId()
  .withMessage("Debe ser un ID de MongoDB válido");

const productoValidacion = [
  validarNombre,
  validarPrecio,
  validarCantidad,
  validarDescripcion,
  validarPuntoReorden,
  validarEsServicio,
  validarTipoProductoId,
  validarProveedorId,
];

const actualizarProductoValidacion = [
  validarNombre,
  validarPrecio,
  validarCantidad,
  validarPuntoReorden,
  validarDescripcion,
  validarEsServicio,
];

module.exports = {
  productoValidacion,
  actualizarProductoValidacion,
};
