const HorasFacturables = require("../models/horas-facturable");
const handleValidationErrors = require("../config/validateResult");
const { getUpdatedFields } = require("../utils/fieldUtils");

const createHorasFacturables = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, precio, moneda, tipoEmpleado_id } = req.body;

    const nuevaHorasFacturables = new HorasFacturables({
      nombre,
      precio,
      moneda,
      tipoEmpleado_id,
    });

    await nuevaHorasFacturables.save();
    res.status(201).json({ message: "Horas facturables creadas exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear horas facturables",
      error: error.message,
    });
  }
};

const getAllHorasFacturables = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { moneda: { $regex: filterRegex } },
      ],
    };

    const horasFacturables = await HorasFacturables.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalHorasFacturables = await HorasFacturables.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalHorasFacturables / limit),
      totalHorasFacturables,
      horasFacturables,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar horas facturables",
      errorMessage: error.message,
    });
  }
};

const getHorasFacturablesById = async (req, res) => {
  try {
    const horasFacturables = await HorasFacturables.findById(req.params.id);
    if (!horasFacturables) {
      return res
        .status(404)
        .json({ message: "Horas facturables no encontradas" });
    }
    res.status(200).json({ message: "Horas facturables encontradas" });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar horas facturables",
      error: error.message,
    });
  }
};

const updateHorasFacturables = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, precio, moneda } = req.body;
    const campos = { nombre, precio, moneda };

    const horasFacturablesActual = await HorasFacturables.findById(
      req.params.id
    );
    if (!horasFacturablesActual) {
      return res
        .status(404)
        .json({ message: "Horas facturables no encontradas" });
    }

    // Verifica los campos que han cambiado
    const { updates, hasChanges, message } = getUpdatedFields(
      campos,
      horasFacturablesActual
    );

    if (!hasChanges) {
      return res.status(200).json({ message });
    }

    await HorasFacturables.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Horas facturables actualizadas con éxito" });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar horas facturables",
      error: error.message,
    });
  }
};

const deleteHorasFacturables = async (req, res) => {
  try {
    const horasFacturables = await HorasFacturables.findByIdAndDelete(
      req.params.id
    );
    if (!horasFacturables) {
      return res
        .status(404)
        .json({ message: "Horas facturables no encontradas" });
    }
    res.status(200).json({ message: "Horas facturables eliminadas con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar horas facturables",
      error: error.message,
    });
  }
};

module.exports = {
  createHorasFacturables,
  getAllHorasFacturables,
  getHorasFacturablesById,
  updateHorasFacturables,
  deleteHorasFacturables,
};
