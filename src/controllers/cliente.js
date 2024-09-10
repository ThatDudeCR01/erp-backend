const Cliente = require("../models/cliente");
const handleValidationErrors = require("../config/validateResult");

const createCliente = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }

  try {
    const { nombre, apellido, correo, telefono, cedula, entidad_id } = req.body;
    const checkUser = await Cliente.findOne({ correo });
    if (checkUser) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    const nuevoCliente = new Cliente({
      nombre,
      apellido,
      correo,
      telefono,
      cedula,
      entidad_id,
    });

    await nuevoCliente.save();
    res.status(201).json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear cliente", error: error.message });
  }
};

const getAllClientes = async (req, res) => {
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
        { cedula: { $regex: filterRegex } },
      ],
    };

    const clientes = await Cliente.find(searchCriteria)
      .select("nombre apellido telefono -_id")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalClientes = await Cliente.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalClientes / limit),
      totalClientes,
      clientes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar clientes",
      errorMessage: error.message,
    });
  }
};

const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).select(
      "nombre apellido telefono -_id"
    );
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar cliente", error: error.message });
  }
};

const updateCliente = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const checkCliente = await Cliente.findById(req.params.id);

    if (!checkCliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Cliente actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar cliente", error: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const checkCliente = await Cliente.findById(req.params.id);

    if (!checkCliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await Cliente.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Cliente eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar cliente", error: error.message });
  }
};

module.exports = {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
};
