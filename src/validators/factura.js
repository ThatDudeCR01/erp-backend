const { body } = require("express-validator");

const validarReferenciaId = body("referenciaId")
  .notEmpty()
  .withMessage("El ID de referencia es requerido")
  .isMongoId()
  .withMessage("Debe ser un ID válido de MongoDB");

const validarReferenciaModelo = body("referenciaModelo")
  .notEmpty()
  .withMessage("El modelo de referencia es requerido")
  .isIn(["Cliente", "Empresa"])
  .withMessage("El modelo de referencia debe ser 'Cliente' o 'Empresa'");

const validarTipoFactura = body("tipo_factura")
  .notEmpty()
  .withMessage("El tipo de factura es requerido")
  .isString()
  .withMessage("El tipo de factura debe ser una cadena de texto");

const validarCantidad = body("cantidad")
  .notEmpty()
  .withMessage("La cantidad es requerida")
  .isInt({ min: 1 })
  .withMessage("La cantidad debe ser un número entero mayor a 0");

const validarProductosIds = body("productosIds")
  .isArray({ min: 1 })
  .withMessage("Debe proporcionar al menos un ID de producto")
  .custom((value) => {
    return value.every((id) => /^[0-9a-fA-F]{24}$/.test(id));
  })
  .withMessage("Cada ID de producto debe ser un ID válido de MongoDB");

const validarProyectosIds = body("proyectosIds")
  .isArray({ min: 1 })
  .withMessage("Debe proporcionar al menos un ID de proyecto")
  .custom((value) => {
    return value.every((id) => /^[0-9a-fA-F]{24}$/.test(id));
  })
  .withMessage("Cada ID de proyecto debe ser un ID válido de MongoDB");

const facturaValidacion = [
  validarReferenciaId,
  validarReferenciaModelo,
  validarTipoFactura,
  validarCantidad,
  validarProductosIds,
  validarProyectosIds,
];

const facturaActualizacionValidacion = [
  validarReferenciaId.optional(),
  validarReferenciaModelo.optional(),
  validarTipoFactura.optional(),
  validarCantidad.optional(),
  validarProductosIds.optional(),
  validarProyectosIds.optional(),
];

module.exports = {
  facturaValidacion,
  facturaActualizacionValidacion,
};
