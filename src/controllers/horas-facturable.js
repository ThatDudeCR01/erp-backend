const HorasFacturables = require("../models/horas-facturable");

exports.createHorasFacturables = async (req, res) => {
  try {
    const { number, id_proyecto, id_tipoEmpleado } = req.body;

    const nuevaHorasFacturables = new HorasFacturables({
      number,
      id_proyecto,
      id_tipoEmpleado,
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

exports.getAllHorasFacturables = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { id_proyecto: { $regex: filterRegex } },
        { id_tipoEmpleado: { $regex: filterRegex } },
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

exports.getHorasFacturablesById = async (req, res) => {
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

exports.updateHorasFacturables = async (req, res) => {
  try {
    const { number, id_proyecto, id_tipoEmpleado } = req.body;

    const horasFacturablesActual = await HorasFacturables.findById(
      req.params.id
    );
    if (!horasFacturablesActual) {
      return res
        .status(404)
        .json({ message: "Horas facturables no encontradas" });
    }

    const updates = {};
    let isModified = false;

    if (number && number !== horasFacturablesActual.number) {
      updates.number = number;
      isModified = true;
    }

    if (
      id_proyecto &&
      id_proyecto.toString() !== horasFacturablesActual.id_proyecto.toString()
    ) {
      updates.id_proyecto = id_proyecto;
      isModified = true;
    }

    if (
      id_tipoEmpleado &&
      id_tipoEmpleado.toString() !==
        horasFacturablesActual.id_tipoEmpleado.toString()
    ) {
      updates.id_tipoEmpleado = id_tipoEmpleado;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const horasFacturables = await HorasFacturables.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
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

exports.deleteHorasFacturables = async (req, res) => {
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
