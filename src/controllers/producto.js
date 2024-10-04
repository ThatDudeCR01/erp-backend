const Producto = require("../models/producto");
const handleValidationErrors = require("../config/validateResult");

const createProducto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, precio, tipoProducto_id, proveedor_id } = req.body;

    const nuevoProducto = new Producto({
      nombre,
      precio,
      tipoProducto_id,
      proveedor_id,
    });

    await nuevoProducto.save();
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear producto", error: error.message });
  }
};

const getAllProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";
    const proveedorId = req.query.id || null;

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $and: [
        {
          $or: [
            { nombre: { $regex: filterRegex } },
            ...(isNaN(filter) ? [] : [{ precio: Number(filter) }]),
          ],
        },
        ...(proveedorId ? [{ proveedor_id: proveedorId }] : []),
      ],
    };

    const productos = await Producto.find(searchCriteria)
      .select("nombre precio tipo -_id")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalProductos = await Producto.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalProductos / limit),
      totalProductos,
      productos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar productos",
      errorMessage: error.message,
    });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
      .select("  nombre precio tipo proveedor_id -_id ")
      .populate("proveedor_id");
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ producto });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar producto", error: error.message });
  }
};

const updateProducto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const productoActual = await Producto.findById(req.params.id);
    if (!productoActual) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Producto.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar producto", error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar producto", error: error.message });
  }
};

module.exports = {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
};
