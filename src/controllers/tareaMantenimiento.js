const TareaMantenimiento = require("../models/tarea-mantenimiento");
const handleValidationErrors = require("../config/validateResult");

const createTareaMantenimiento = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, tipo, descripcion, duracion, template_id } = req.body;

    const nuevaTareaMantenimiento = new TareaMantenimiento({
      nombre,
      tipo,
      descripcion,
      duracion,
      template_id,
    });

    await nuevaTareaMantenimiento.save();

    res.status(201).json({
      message: "Tarea de mantenimiento creada exitosamente",
      tareaMantenimiento: nuevaTareaMantenimiento,
    });
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
      .select("nombre tipo descripcion -_id")
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
    ).select("nombre tipo descripcion -_id");
    if (!tareaMantenimiento) {
      return res
        .status(404)
        .json({ message: "Tarea de mantenimiento no encontrada" });
    }
    res.status(200).json({ tareaMantenimiento });
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
    const { nombre, tipo, descripcion } = req.body;
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
      { $set: req.body },
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
