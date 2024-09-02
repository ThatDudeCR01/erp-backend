const Entidad = require("../models/entidad");
const handleValidationErrors = require("../config/validateResult");

exports.createEntidad = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, apellido, correo, telefono, cedula } = req.body;

    const checkEntidad = await Entidad.findOne({ correo });
    if (checkEntidad) {
      return res.status(400).json({
        message: "Ya existe una entidad con el correo proporcionado",
      });
    }

    const nuevaEntidad = new Entidad({
      nombre,
      apellido,
      correo,
      telefono,
      cedula,
    });

    await nuevaEntidad.save();
    res.status(201).json({ message: "Entidad creada exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear entidad", error: error.message });
  }
};

exports.getAllEntidades = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { apellido: { $regex: filterRegex } },
        { correo: { $regex: filterRegex } },
        { telefono: { $regex: filterRegex } },
        { cedula: { $regex: filterRegex } },
      ],
    };

    const entidades = await Entidad.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEntidades = await Entidad.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalEntidades / limit),
      totalEntidades,
      entidades,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar entidades",
      errorMessage: error.message,
    });
  }
};

exports.getEntidadById = async (req, res) => {
  try {
    const entidad = await Entidad.findById(req.params.id);
    if (!entidad) {
      return res.status(404).json({ message: "Entidad no encontrada" });
    }
    res.status(200).json(entidad);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar entidad", error: error.message });
  }
};

exports.updateEntidad = async (req, res) => {
  try {
    const entidadActual = await Entidad.findById(req.params.id);
    if (!entidadActual) {
      return res.status(404).json({ message: "Entidad no encontrada" });
    }

    const entidad = await Entidad.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Entidad actualizada con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar entidad", error: error.message });
  }
};

exports.deleteEntidad = async (req, res) => {
  try {
    const entidad = await Entidad.findByIdAndDelete(req.params.id);
    if (!entidad) {
      return res.status(404).json({ message: "Entidad no encontrada" });
    }
    res.status(200).json({ message: "Entidad eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar entidad", error: error.message });
  }
};
