const TareaMantenimiento = require("../models/tarea-mantenimiento");
const Template = require("../models/template");

exports.createTareaMantenimiento = async (req, res) => {
  try {
    const { nombre, tipo, descripcion, duracion, template_id } = req.body;

    const nuevaTareaMantenimiento = new TareaMantenimiento({
      nombre,
      tipo,
      descripcion,
      duracion,
      template_id,
    });

    const templateExistente = await Template.findById(template_id);
    if (!templateExistente) {
      return res.status(404).json({
        message: "El template proporcionado no se encontró en la base de datos",
      });
    }

    await nuevaTareaMantenimiento.save();
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

exports.getAllTareasMantenimiento = async (req, res) => {
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

exports.getTareaMantenimientoById = async (req, res) => {
  try {
    const tareaMantenimiento = await TareaMantenimiento.findById(req.params.id);
    if (!tareaMantenimiento) {
      return res
        .status(404)
        .json({ message: "Tarea de mantenimiento no encontrada" });
    }
    res.status(200).json({ message: "Tarea de mantenimiento encontrada" });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tarea de mantenimiento",
      error: error.message,
    });
  }
};

exports.updateTareaMantenimiento = async (req, res) => {
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

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== tareaMantenimientoActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (tipo && tipo !== tareaMantenimientoActual.tipo) {
      updates.tipo = tipo;
      isModified = true;
    }

    if (descripcion && descripcion !== tareaMantenimientoActual.descripcion) {
      updates.descripcion = descripcion;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const tareaMantenimiento = await TareaMantenimiento.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
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

exports.deleteTareaMantenimiento = async (req, res) => {
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
