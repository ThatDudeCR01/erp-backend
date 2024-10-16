const TareaMantenimiento = require("../models/tarea-mantenimiento");
const Template = require("../models/template");
const handleValidationErrors = require("../config/validateResult");
const { obtenerFechaCostaRica } = require("../utils/obtenerFechaCostaRica");

const createTareaMantenimiento = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, tipo, descripcion, duracion, fecha_cobro, template_id } =
      req.body;
    const templateExistente = await Template.findById(template_id);
    if (!templateExistente) {
      return res.status(404).json({
        message: "El template proporcionado no se encontró en la base de datos",
      });
    }
    await TareaMantenimiento({
      nombre,
      tipo,
      descripcion,
      duracion,
      fecha_cobro,
      template_id,
    }).save();

    res
      .status(201)
      .json({ message: "Tarea de mantenimiento creada exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear tarea de mantenimiento",
      error: error.message,
    });
  }
};

const getAllTareasMantenimiento = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { tipo: { $regex: filterRegex } },
        { descripcion: { $regex: filterRegex } },
      ],
    };

    const tareasMantenimiento = await TareaMantenimiento.find(searchCriteria)
      .select(" -__v")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalTareasMantenimiento = await TareaMantenimiento.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalTareasMantenimiento / limit),
      totalTareasMantenimiento,
      tareasMantenimiento,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tareas de mantenimiento",
      errorMessage: error.message,
    });
  }
};

const getTareaMantenimientoById = async (req, res) => {
  try {
    const tareaMantenimiento = await TareaMantenimiento.findById(
      req.params.id
    ).select("-_id -__v");
    if (!tareaMantenimiento) {
      return res
        .status(404)
        .json({ message: "Tarea de mantenimiento no encontrada" });
    }

    const fechaCobroCR = tareaMantenimiento.fecha_cobro
      ? obtenerFechaCostaRica(tareaMantenimiento.fecha_cobro)
      : null;

    res.status(200).json({
      ...tareaMantenimiento._doc,
      fecha_cobro: fechaCobroCR,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tarea de mantenimiento",
      error: error.message,
    });
  }
};

const updateTareaMantenimiento = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, tipo, duracion, descripcion, fecha_cobro } = req.body;

    const tareaMantenimientoActual = await TareaMantenimiento.findById(
      req.params.id
    );
    if (!tareaMantenimientoActual) {
      return res
        .status(404)
        .json({ message: "Tarea de mantenimiento no encontrada" });
    }

    await TareaMantenimiento.findByIdAndUpdate(
      req.params.id,
      { $set: { nombre, tipo, duracion, descripcion, fecha_cobro } },
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(200)
      .json({ message: "Tarea de mantenimiento actualizada con éxito" });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar tarea de mantenimiento",
      error: error.message,
    });
  }
};

const deleteTareaMantenimiento = async (req, res) => {
  try {
    const tareaMantenimiento = await TareaMantenimiento.findByIdAndDelete(
      req.params.id
    );
    if (!tareaMantenimiento) {
      return res
        .status(404)
        .json({ message: "Tarea de mantenimiento no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Tarea de mantenimiento eliminada con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar tarea de mantenimiento",
      error: error.message,
    });
  }
};

module.exports = {
  createTareaMantenimiento,
  getAllTareasMantenimiento,
  getTareaMantenimientoById,
  updateTareaMantenimiento,
  deleteTareaMantenimiento,
};
