const Solicitud = require("../models/solicitudes");
const handleValidationErrors = require("../config/validateResult");

exports.createSolicitud = async (req, res) => {
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

exports.getAllSolicitudes = async (req, res) => {
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

exports.getSolicitudById = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }
    res.status(200).json({ message: "Solicitud encontrada" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar solicitud", error: error.message });
  }
};

exports.updateSolicitud = async (req, res) => {
  try {
    const { nombre, fecha, estaAprobada, empleadoSolicita, usuario_id } =
      req.body;

    const solicitudActual = await Solicitud.findById(req.params.id);
    if (!solicitudActual) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== solicitudActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (fecha && fecha !== solicitudActual.fecha.toISOString().split("T")[0]) {
      updates.fecha = fecha;
      isModified = true;
    }

    if (
      typeof estaAprobada !== "undefined" &&
      estaAprobada !== solicitudActual.estaAprobada
    ) {
      updates.estaAprobada = estaAprobada;
      isModified = true;
    }

    if (
      empleadoSolicita &&
      empleadoSolicita.toString() !==
        solicitudActual.empleadoSolicita.toString()
    ) {
      updates.empleadoSolicita = empleadoSolicita;
      isModified = true;
    }

    if (
      usuario_id &&
      usuario_id.toString() !== solicitudActual.usuario_id.toString()
    ) {
      updates.usuario_id = usuario_id;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const solicitud = await Solicitud.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Solicitud actualizada con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar solicitud", error: error.message });
  }
};

exports.deleteSolicitud = async (req, res) => {
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
