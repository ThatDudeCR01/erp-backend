const Entidad = require("../models/entidad");

exports.createEntidad = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, cedula, usuario } = req.body;

    const nuevaEntidad = new Entidad({
      nombre,
      apellido,
      correo,
      telefono,
      cedula,
      usuario,
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
    res.status(200).json({ message: "Entidad encontrada" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar entidad", error: error.message });
  }
};

exports.updateEntidad = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, cedula, usuario } = req.body;

    const entidadActual = await Entidad.findById(req.params.id);
    if (!entidadActual) {
      return res.status(404).json({ message: "Entidad no encontrada" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== entidadActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (apellido && apellido !== entidadActual.apellido) {
      updates.apellido = apellido;
      isModified = true;
    }

    if (correo && correo !== entidadActual.correo) {
      updates.correo = correo;
      isModified = true;
    }

    if (telefono && telefono !== entidadActual.telefono) {
      updates.telefono = telefono;
      isModified = true;
    }

    if (cedula && cedula !== entidadActual.cedula) {
      updates.cedula = cedula;
      isModified = true;
    }

    if (usuario && usuario.toString() !== entidadActual.usuario.toString()) {
      updates.usuario = usuario;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const entidad = await Entidad.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
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
