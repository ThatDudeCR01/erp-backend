const Template = require("../models/template");

exports.createTemplate = async (req, res) => {
  try {
    const { nombre, tareasMantenimiento_id } = req.body;

    const nuevoTemplate = new Template({
      nombre,
      tareasMantenimiento_id,
    });

    await nuevoTemplate.save();
    res.status(201).json({ message: "Template creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear template", error: error.message });
  }
};

exports.getAllTemplates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [{ nombre: { $regex: filterRegex } }],
    };

    const templates = await Template.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalTemplates = await Template.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalTemplates / limit),
      totalTemplates,
      templates,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar templates",
      errorMessage: error.message,
    });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id).populate(
      "tareasMantenimiento"
    );
    if (!template) {
      return res.status(404).json({ message: "Template no encontrado" });
    }
    res.status(200).json({ message: "Template encontrado", template });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar template", error: error.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const { nombre, tareasMantenimiento } = req.body;

    const templateActual = await Template.findById(req.params.id);
    if (!templateActual) {
      return res.status(404).json({ message: "Template no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== templateActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (
      tareasMantenimiento &&
      tareasMantenimiento.toString() !==
        templateActual.tareasMantenimiento.toString()
    ) {
      updates.tareasMantenimiento = tareasMantenimiento;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(200)
      .json({ message: "Template actualizado con éxito", template });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar template", error: error.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template no encontrado" });
    }
    res.status(200).json({ message: "Template eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar template", error: error.message });
  }
};
