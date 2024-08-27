const Producto = require("../models/producto");

exports.createProducto = async (req, res) => {
  try {
    const { nombre, precio, tipo } = req.body;

    const nuevoProducto = new Producto({
      nombre,
      precio,
      tipo,
    });

    await nuevoProducto.save();
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear producto", error: error.message });
  }
};

exports.getAllProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { precio: { $regex: filterRegex } },
      ],
    };

    const productos = await Producto.find(searchCriteria)
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

exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar producto", error: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { nombre, precio, tipo } = req.body;

    const productoActual = await Producto.findById(req.params.id);
    if (!productoActual) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== productoActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (precio && precio !== productoActual.precio) {
      updates.precio = precio;
      isModified = true;
    }

    if (tipo && tipo.toString() !== productoActual.tipo.toString()) {
      updates.tipo = tipo;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar producto", error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
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
