const Cliente = require("../models/cliente");
const handleValidationErrors = require("../config/validateResult");

const createCliente = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }

  try {
    const {
      nombre,
      cedula,
      apellido,
      correo,
      telefono,
      default_role,
      entidad_id,
    } = req.body;

    const checkCliente = await Cliente.findOne({ correo });
    if (checkCliente) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    const nuevoCliente = new Cliente({
      nombre,
      cedula,
      apellido,
      correo,
      telefono,
      default_role,
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

const changeActive = async (req, res) => {
  try {
    const cliente = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const active = !usuario.activo;
    await Cliente.findByIdAndUpdate(req.params.id, { activo: active });

    res.status(200).json({ message: "Estado de cliente actualizado" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar estado de cliente",
      error: error.message,
    });
  }
};

const changeRoleActivo = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  const { id } = req.params;
  const { role_id } = req.body;

  try {
    const roleExists = await Roles.findById(role_id);

    if (!roleExists) {
      return res.status(404).json({ message: "Role not found" });
    }

    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!cliente.roles.includes(role_id)) {
      return res.status(400).json({
        message: "The specified role is not associated with this client.",
      });
    }

    cliente.active_role = role_id;
    await cliente.save();

    res.status(200).json({
      message: "Active role updated successfully",
      active_role: cliente.active_role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Agregar un rol a un cliente
const addRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { role_id } = req.body;

  try {
    const roleExists = await Rol.findById(role_id);
    if (!roleExists) {
      return res.status(404).json({ message: "Role not found" });
    }

    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (cliente.roles.includes(role_id)) {
      return res
        .status(400)
        .json({ message: "Role already assigned to the client" });
    }

    cliente.roles.push(role_id);
    await cliente.save();

    res.status(200).json({
      message: "Role added successfully",
      roles: cliente.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Eliminar un rol de un cliente
const removeRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { role_id } = req.body;

  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!cliente.roles.includes(role_id)) {
      return res
        .status(400)
        .json({ message: "Role not assigned to the client" });
    }

    cliente.roles = cliente.roles.filter((role) => role.toString() !== role_id);
    await cliente.save();

    res.status(200).json({
      message: "Role removed successfully",
      roles: cliente.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
  changeActive,
  changeRoleActivo,
  addRole,
  removeRole,
};
