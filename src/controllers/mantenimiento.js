const Mantenimiento = require("../models/mantenimiento");
const Template = require("../models/template");
const Empresa = require("../models/empresa");

const createMantenimiento = async (req, res) => {
  try {
    const { empresa_id, template_id, estado } = req.body;

    const empresaExistente = await Empresa.findById(empresa_id);
    if (!empresaExistente) {
      return res.status(404).json({
        message: "La empresa proporcionada no se encontró en la base de datos",
      });
    }

    const template = await Template.findById(template_id).populate(
      "tareasMantenimiento_id"
    );

    if (!template) {
      return res
        .status(404)
        .json({ message: "Template no encontrado en la base de datos" });
    }

    const tareasCopia = template.tareasMantenimiento_id.map((tarea) => {
      return {
        tareaMantenimiento_id: tarea._id.toString(),
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        descripcion: tarea.descripcion,
        duracion: tarea.duracion,
        template_id: tarea.template_id,
      };
    });

    const nuevoMantenimiento = new Mantenimiento({
      empresa_id,
      template_id,
      estado,
      tareas: tareasCopia,
    });

    await nuevoMantenimiento.save();

    res.status(201).json({
      message: "Mantenimiento creado con éxito",
      mantenimiento: nuevoMantenimiento,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear mantenimiento", error: error.message });
  }
};

const getAllMantenimientos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    let searchCriteria = {
      $or: [{ estado: { $regex: filterRegex } }],
    };

    const mantenimientos = await Mantenimiento.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalMantenimientos = await Mantenimiento.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalMantenimientos / limit),
      totalMantenimientos,
      mantenimientos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar mantenimientos",
      errorMessage: error.message,
    });
  }
};

const getMantenimientoById = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }
    res.status(200).json({ mantenimiento });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar mantenimiento", error: error.message });
  }
};

const updateMantenimiento = async (req, res) => {
  try {
    const estado = req.body;
    const mantenimientoActual = await Mantenimiento.findById(req.params.id);
    if (!mantenimientoActual) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }

    await Mantenimiento.findByIdAndUpdate(
      req.params.id,
      { $set: estado },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Mantenimiento actualizado con éxito" });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar mantenimiento",
      error: error.message,
    });
  }
};

const deleteMantenimiento = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findByIdAndDelete(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }
    res.status(200).json({ message: "Mantenimiento eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar mantenimiento",
      error: error.message,
    });
  }
};

module.exports = {
  createMantenimiento,
  getAllMantenimientos,
  getMantenimientoById,
  updateMantenimiento,
  deleteMantenimiento,
};
