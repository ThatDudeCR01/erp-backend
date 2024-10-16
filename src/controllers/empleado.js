const Empleado = require("../models/empleado");
const handleValidationErrors = require("../config/validateResult");

const createEmpleado = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const {
      nombre,
      apellido,
      correo,
      telefono,
      salario,
      entidad_id,
      cedula,
      tipo_empleado_id,
    } = req.body;

    const empleadoExistente = await Empleado.findOne({ entidad_id });
    if (empleadoExistente) {
      return res.status(400).json({
        message: "Ya existe un empleado con la misma entidad_id.",
      });
    }

    await Empleado({
      nombre,
      apellido,
      correo,
      telefono,
      salario,
      cedula,
      entidad_id,
      tipo_empleado_id,
    }).save();

    res.status(201).json({ message: "Empleado creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear empleado", error: error.message });
  }
};

const getAllEmpleados = async (req, res) => {
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
        { puesto: { $regex: filterRegex } },
      ],
    };

    const empleados = await Empleado.find(searchCriteria)
      .select("nombre apellido telefeno correo puesto salario -_id")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEmpleados = await Empleado.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalEmpleados / limit),
      totalEmpleados,
      empleados,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar empleados",
      errorMessage: error.message,
    });
  }
};

const getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id).select(
      " -salario -_id"
    );
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json({ empleado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar empleado", error: error.message });
  }
};

const updateEmpleado = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, apellido, puesto, salario } = req.body;
    const empleadoActual = await Empleado.findById(req.params.id);
    if (!empleadoActual) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    await Empleado.findByIdAndUpdate(
      req.params.id,
      { $set: { nombre, apellido, puesto, salario } },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Empleado actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar empleado", error: error.message });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json({ message: "Empleado eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar empleado", error: error.message });
  }
};

module.exports = {
  createEmpleado,
  getAllEmpleados,
  getEmpleadoById,
  updateEmpleado,
  deleteEmpleado,
};
