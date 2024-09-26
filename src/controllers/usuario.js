const Usuario = require("../models/usuario");
const Rol = require("../models/roles");
const bcrypt = require("bcryptjs");
const handleValidationErrors = require("../config/validateResult");

const createUsuario = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }

  try {
    const {
      nombre,
      apellido,
      correo,
      contraseña,
      cedula,
      entidad_id,
      rolPredeterminado,
      roles,
    } = req.body;

    const checkUser = await Usuario.findOne({ correo });
    if (checkUser) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      correo,
      contraseña: hashedPassword,
      cedula,
      entidad_id,
      rolPredeterminado,
      roles,
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear usuario", error: error.message });
  }
};

const getAllUsuarios = async (req, res) => {
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

    const usuarios = await Usuario.find(searchCriteria)
      .select("id nombre correo")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalUsuarios = await Usuario.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalUsuarios / limit),
      totalUsuarios,
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar usuarios",
      errorMessage: error.message,
    });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar usuario", error: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuarioActual = await Usuario.findById(req.params.id);
    if (!usuarioActual) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar usuario", error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};

const changeActive = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const active = !usuario.activo;
    await Usuario.findByIdAndUpdate(req.params.id, { activo: active });

    res.status(200).json({ message: "Estado de usuario actualizado" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar estado de usuario",
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
    const roleExists = await Rol.findById(role_id);

    if (!roleExists) {
      return res.status(404).json({ message: "Role not found" });
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!usuario.roles.includes(role_id)) {
      return res.status(400).json({
        message: "The specified role is not associated with this user.",
      });
    }

    usuario.active_role = role_id;
    await usuario.save();

    res.status(200).json({
      message: "Active role updated successfully",
      active_role: usuario.active_role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }

    if (usuario.roles.includes(role_id)) {
      return res
        .status(400)
        .json({ message: "Role already assigned to the user" });
    }

    usuario.roles.push(role_id);
    await usuario.save();

    res.status(200).json({
      message: "Role added successfully",
      roles: usuario.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { role_id } = req.body;

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!usuario.roles.includes(role_id)) {
      return res.status(400).json({ message: "Role not assigned to the user" });
    }

    usuario.roles = usuario.roles.filter((role) => role.toString() !== role_id);
    await usuario.save();

    res.status(200).json({
      message: "Role removed successfully",
      roles: usuario.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  changeActive,
  changeRoleActivo,
  changeRoleActivo,
  addRole,
  removeRole,
};
