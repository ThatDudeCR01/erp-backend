const TipoProducto = require("../models/tipo-producto");

exports.createTipoProducto = async (req, res) => {
  try {
    const { nombre, unidad, descripcion, producto } = req.body;

    const nuevoTipoProducto = new TipoProducto({
      nombre,
      unidad,
      descripcion,
      producto,
    });

    await nuevoTipoProducto.save();
    res.status(201).json({ message: "Tipo de producto creado exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear tipo de producto",
      error: error.message,
    });
  }
};

exports.getAllTiposProducto = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { unidad: { $regex: filterRegex } },
        { descripcion: { $regex: filterRegex } },
      ],
    };

    const tiposProducto = await TipoProducto.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalTiposProducto = await TipoProducto.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalTiposProducto / limit),
      totalTiposProducto,
      tiposProducto,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tipos de producto",
      errorMessage: error.message,
    });
  }
};

exports.getTipoProductoById = async (req, res) => {
  try {
    const tipoProducto = await TipoProducto.findById(req.params.id).populate(
      "producto"
    );
    if (!tipoProducto) {
      return res
        .status(404)
        .json({ message: "Tipo de producto no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Tipo de producto encontrado", tipoProducto });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tipo de producto",
      error: error.message,
    });
  }
};

exports.updateTipoProducto = async (req, res) => {
  try {
    const { nombre, unidad, descripcion, producto } = req.body;

    const tipoProductoActual = await TipoProducto.findById(req.params.id);
    if (!tipoProductoActual) {
      return res
        .status(404)
        .json({ message: "Tipo de producto no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== tipoProductoActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (unidad && unidad !== tipoProductoActual.unidad) {
      updates.unidad = unidad;
      isModified = true;
    }

    if (descripcion && descripcion !== tipoProductoActual.descripcion) {
      updates.descripcion = descripcion;
      isModified = true;
    }

    if (
      producto &&
      producto.toString() !== tipoProductoActual.producto.toString()
    ) {
      updates.producto = producto;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const tipoProducto = await TipoProducto.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Tipo de producto actualizado con éxito",
      tipoProducto,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar tipo de producto",
      error: error.message,
    });
  }
};

exports.deleteTipoProducto = async (req, res) => {
  try {
    const tipoProducto = await TipoProducto.findByIdAndDelete(req.params.id);
    if (!tipoProducto) {
      return res
        .status(404)
        .json({ message: "Tipo de producto no encontrado" });
    }
    res.status(200).json({ message: "Tipo de producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar tipo de producto",
      error: error.message,
    });
  }
};
