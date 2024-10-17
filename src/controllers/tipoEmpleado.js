const TipoEmpleado = require("../models/tipo-empleado");
const handleValidationErrors = require("../config/validateResult");

const createTipoEmpleado = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, horasFacturables_id, tarifa } = req.body;

    const nuevoTipoEmpleado = new TipoEmpleado({
      nombre,
      horasFacturables_id,
      tarifa,
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

const getAllTiposEmpleado = async (req, res) => {
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

const getTipoEmpleadoById = async (req, res) => {
  try {
    const tipoEmpleado = await TipoEmpleado.findById(req.params.id);

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

const updateTipoEmpleado = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, tarifa } = req.body;
    const tipoEmpleadoActual = await TipoEmpleado.findById(req.params.id);
    if (!tipoEmpleadoActual) {
      return res
        .status(404)
        .json({ message: "Tipo de empleado no encontrado" });
    }

    const tipoEmpleado = await TipoEmpleado.findByIdAndUpdate(
      req.params.id,
      { $set: { nombre, tarifa } },
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

const deleteTipoEmpleado = async (req, res) => {
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

module.exports = {
  createTipoEmpleado,
  getAllTiposEmpleado,
  getTipoEmpleadoById,
  updateTipoEmpleado,
  deleteTipoEmpleado,
};
