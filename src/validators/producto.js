const { body } = require("express-validator");
const mongoose = require("mongoose");
const Proveedor = require("../models/proveedor");
const TipoProducto = require("../models/tipo-producto");

// Validación para el campo nombre
const validarNombre = body("nombre")
  .notEmpty()
  .withMessage("El nombre es requerido")
  .trim()
  .escape()
  .isLength({ min: 3, max: 100 })
  .withMessage("El nombre debe tener entre 3 y 100 caracteres")
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
  .withMessage("El nombre solo puede contener letras, números y espacios");

// Validación para el campo precio
const validarPrecio = body("precio")
  .notEmpty()
  .withMessage("El precio es requerido")
  .isFloat({ gt: 0 })
  .withMessage("El precio debe ser un número mayor que 0")
  .isNumeric()
  .withMessage("El precio solo debe contener números");

const validarTipoProductoId = body("tipoProducto_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de tipo de producto")
  .custom(async (value) => {
    // Verifica si el ID es un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID del tipo de producto no es válido");
    }

    // Verifica si el proveedor existe en la base de datos
    const proveedorExistente = await TipoProducto.findById(value);
    if (!proveedorExistente) {
      throw new Error("El tipo de producto no se encontró en la base de datos");
    }

    return true;
  });

// Validación para el campo proveedor_id
const validarProveedorId = body("proveedor_id")
  .notEmpty()
  .withMessage("Debe proporcionar un ID de proveedor")
  .custom(async (value) => {
    // Verifica si el ID es un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El ID del proveedor no es válido");
    }

    // Verifica si el proveedor existe en la base de datos
    const proveedorExistente = await Proveedor.findById(value);
    if (!proveedorExistente) {
      throw new Error("El proveedor no se encontró en la base de datos");
    }

    return true;
  });

module.exports = {
  validarProveedorId,
};
// Agrupación de validaciones para la creación de un producto
const productoValidacion = [
  validarNombre,
  validarPrecio,

  validarTipoProductoId,
  validarProveedorId,
];

const actualizarProductoValidacion = [validarNombre, validarPrecio];

module.exports = {
  productoValidacion,
  actualizarProductoValidacion,
};
