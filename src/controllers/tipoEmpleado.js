const TipoEmpleado = require("../models/tipo-empleado");

exports.createTipoEmpleado = async (req, res) => {
  try {
    const { nombre, horasFacturables_id, empleado_id } = req.body;

    const nuevoTipoEmpleado = new TipoEmpleado({
      nombre,
      horasFacturables_id,
      empleado_id,
    });

    await nuevoTipoEmpleado.save();
    res.status(201).json({ message: "Tipo de empleado creado exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear tipo de empleado",
      error: error.message,
    });
  }
};

exports.getAllTiposEmpleado = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [{ nombre: { $regex: filterRegex } }],
    };

    const tiposEmpleado = await TipoEmpleado.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalTiposEmpleado = await TipoEmpleado.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalTiposEmpleado / limit),
      totalTiposEmpleado,
      tiposEmpleado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tipos de empleado",
      errorMessage: error.message,
    });
  }
};

exports.getTipoEmpleadoById = async (req, res) => {
  try {
    const tipoEmpleado = await TipoEmpleado.findById(req.params.id).populate(
      "empleado_id"
    );
    if (!tipoEmpleado) {
      return res
        .status(404)
        .json({ message: "Tipo de empleado no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Tipo de empleado encontrado", tipoEmpleado });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar tipo de empleado",
      error: error.message,
    });
  }
};

exports.updateTipoEmpleado = async (req, res) => {
  try {
    const { nombre, precioxHora, empleado_id } = req.body;

    const tipoEmpleadoActual = await TipoEmpleado.findById(req.params.id);
    if (!tipoEmpleadoActual) {
      return res
        .status(404)
        .json({ message: "Tipo de empleado no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== tipoEmpleadoActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (
      typeof precioxHora !== "undefined" &&
      precioxHora !== tipoEmpleadoActual.precioxHora
    ) {
      updates.precioxHora = precioxHora;
      isModified = true;
    }

    if (
      empleado_id &&
      empleado_id.toString() !== tipoEmpleadoActual.empleado_id.toString()
    ) {
      updates.empleado_id = empleado_id;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const tipoEmpleado = await TipoEmpleado.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Tipo de empleado actualizado con éxito",
      tipoEmpleado,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar tipo de empleado",
      error: error.message,
    });
  }
};

exports.deleteTipoEmpleado = async (req, res) => {
  try {
    const tipoEmpleado = await TipoEmpleado.findByIdAndDelete(req.params.id);
    if (!tipoEmpleado) {
      return res
        .status(404)
        .json({ message: "Tipo de empleado no encontrado" });
    }
    res.status(200).json({ message: "Tipo de empleado eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar tipo de empleado",
      error: error.message,
    });
  }
};
