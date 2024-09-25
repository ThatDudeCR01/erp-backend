const Solicitud = require("../models/solicitudes");
const handleValidationErrors = require("../config/validateResult");
const { getUpdatedFields } = require("../utils/fieldUtils");
const { obtenerFechaCostaRica } = require("../utils/obtenerFechaCostaRica");

const createSolicitud = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, fecha, empleadoSolicita_id, empleadoAprueba_id } = req.body;

    const nuevaSolicitud = new Solicitud({
      nombre,
      fecha,
      empleadoSolicita_id,
      empleadoAprueba_id,
    });

    await nuevaSolicitud.save();
    res.status(201).json({ message: "Solicitud creada exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear solicitud", error: error.message });
  }
};

const getAllSolicitudes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { fecha: { $regex: filterRegex } },
      ],
    };

    const solicitudes = await Solicitud.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalSolicitudes = await Solicitud.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalSolicitudes / limit),
      totalSolicitudes,
      solicitudes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar solicitudes",
      errorMessage: error.message,
    });
  }
};

const getSolicitudById = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    const solicitudConFechasAjustadas = {
      ...solicitud._doc,
      fechaCreacion: obtenerFechaCostaRica(solicitud.fechaCreacion),
      fechaResuelto: solicitud.fechaResuelto
        ? obtenerFechaCostaRica(solicitud.fechaResuelto)
        : null,
    };

    res.status(200).json({
      message: "Solicitud obtenida con éxito",
      solicitud: solicitudConFechasAjustadas,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar solicitud", error: error.message });
  }
};

const updateSolicitud = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const {
      nombre,
      descripcion,
      fechaResuelto,
      estaAprobada,
      empleadoAprueba_id,
    } = req.body;
    const campos = {
      nombre,
      fechaResuelto,
      descripcion,
      estaAprobada,
      empleadoAprueba_id,
    };

    const solicitudActual = await Solicitud.findById(req.params.id);
    if (!solicitudActual) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    const { updates, hasChanges, message } = getUpdatedFields(
      campos,
      solicitudActual
    );

    if (!hasChanges) {
      return res.status(200).json({ message });
    }

    if (fechaResuelto) {
      updates.fechaResuelto = obtenerFechaCostaRica(fechaResuelto);
    }

    const solicitud = await Solicitud.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Solicitud actualizada con éxito", solicitud });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar la solicitud",
      error: error.message,
    });
  }
};

const deleteSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndDelete(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }
    res.status(200).json({ message: "Solicitud eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar solicitud", error: error.message });
  }
};

module.exports = {
  createSolicitud,
  getAllSolicitudes,
  getSolicitudById,
  updateSolicitud,
  deleteSolicitud,
};
