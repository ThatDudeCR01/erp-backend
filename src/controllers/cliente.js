const Cliente = require("../models/cliente");
const handleValidationErrors = require("../config/validateResult");

const createCliente = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }

  try {
    const { nombre, cedula, apellido, correo, telefono, tarifa, entidad_id } =
      req.body;

    const clienteDuplicado = await Cliente.findOne({
      $or: [{ correo: correo }, { cedula: cedula }, { entidad_id: entidad_id }],
    });

    if (clienteDuplicado) {
      let errorMessage = "";

      switch (true) {
        case clienteDuplicado.correo === correo:
          errorMessage = "El correo ya está en uso";
          break;

        case clienteDuplicado.cedula === cedula:
          errorMessage = "La cedula ya está en uso";
          break;

        case clienteDuplicado.entidad_id.toString() === entidad_id:
          errorMessage =
            "Ya existe un cliente asociado a esta entidad. No puede crear otro cliente con el mismo entidad_id.";
          break;
      }

      if (errorMessage) {
        return res.status(400).json({ message: errorMessage });
      }
    }

    const nuevoCliente = new Cliente({
      nombre,
      cedula,
      apellido,
      correo,
      telefono,
      entidad_id,
      tarifa,
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
    const cliente = await Cliente.findById(req.params.id);
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
    const { nombre, apellido, estaActivo, telefono, tarifa } = req.body;

    const checkCliente = await Cliente.findById(req.params.id);

    if (!checkCliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    await Cliente.findByIdAndUpdate(
      req.params.id,
      { $set: { nombre, apellido, estaActivo, telefono, tarifa } },
      { new: true, runValidators: true }
    );

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

const changeActive = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const nuevoEstado = !cliente.estaActivo;

    cliente.estaActivo = nuevoEstado;
    await cliente.save();

    res.status(200).json({ message: "Estado de cliente actualizado" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar estado de cliente",
      error: error.message,
    });
  }
};

module.exports = {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
  changeActive,
};
