const TipoProducto = require("../models/tipo-producto");
const handleValidationErrors = require("../config/validateResult");
const { getUpdatedFields } = require("../utils/fieldUtils");

const createTipoProducto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, unidad, descripcion } = req.body;

    const nuevoTipoProducto = new TipoProducto({
      nombre,
      unidad,
      descripcion,
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

const getAllTiposProducto = async (req, res) => {
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
      .select("nombre unidad descripcion -_id")
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

const getTipoProductoById = async (req, res) => {
  try {
    const tipoProducto = await TipoProducto.findById(req.params.id).select(
      " nombre unidad descripcion -_id"
    );
    if (!tipoProducto) {
      return res
        .status(404)
        .json({ message: "Tipo de producto no encontrado" });
    }
    res.status(200).json({ tipoProducto });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tipo de producto",
      error: error.message,
    });
  }
};

const updateTipoProducto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, unidad, descripcion } = req.body;
    const campos = { nombre, unidad, descripcion };

    const tipoProductoActual = await TipoProducto.findById(req.params.id);
    if (!tipoProductoActual) {
      return res.status(404).json({ message: "Tipo producto no encontrado" });
    }

    const { updates, hasChanges, message } = getUpdatedFields(
      campos,
      tipoProductoActual
    );

    if (!hasChanges) {
      return res.status(200).json({ message });
    }

    const producto = await TipoProducto.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Tipo de producto actualizado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar tipo de producto",
      error: error.message,
    });
  }
};

const deleteTipoProducto = async (req, res) => {
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

module.exports = {
  createTipoProducto,
  getAllTiposProducto,
  getTipoProductoById,
  updateTipoProducto,
  deleteTipoProducto,
};
