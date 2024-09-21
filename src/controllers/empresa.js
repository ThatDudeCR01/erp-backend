const Empresa = require("../models/empresa");
const handleValidationErrors = require("../config/validateResult");
const { getUpdatedFields } = require("../utils/fieldUtils");
const Cliente = require("../models/cliente");
const mongoose = require("mongoose");

const createEmpresa = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, correo, cliente_id } = req.body;

    const nuevaEmpresa = new Empresa({
      nombre,
      correo,
      cliente_id,
    });

    await nuevaEmpresa.save();
    res.status(201).json({ message: "Empresa creada exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear empresa", error: error.message });
  }
};

const getAllEmpresas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { correo: { $regex: filterRegex } },
      ],
    };

    const empresas = await Empresa.find(searchCriteria)
      .select("nombre correo -_id")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEmpresas = await Empresa.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalEmpresas / limit),
      totalEmpresas,
      empresas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar empresas",
      errorMessage: error.message,
    });
  }
};

const getEmpresaById = async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id).select(
      "nombre correo -_id"
    );
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    res.status(200).json(empresa);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar empresa", error: error.message });
  }
};

const updateEmpresa = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, tieneMantenimiento } = req.body;
    const campos = { nombre, tieneMantenimiento };

    const empresaActual = await Empresa.findById(req.params.id);
    if (!empresaActual) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    const { updates, hasChanges, message } = getUpdatedFields(
      campos,
      empresaActual
    );

    if (!hasChanges) {
      return res.status(200).json({ message });
    }

    await Empresa.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Empresa actualizada con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar empresa", error: error.message });
  }
};

const deleteEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    res.status(200).json({ message: "Empresa eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar empresa", error: error.message });
  }
};

const getEmpresaByClienteId = async (req, res) => {
  try {
    const { cliente_id } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      cliente_id,
      $or: [
        { nombre: { $regex: filterRegex } },
        { correo: { $regex: filterRegex } },
      ],
    };

    if (!cliente_id) {
      return res.status(400).json({ message: "El cliente_id es requerido." });
    }

    if (!mongoose.Types.ObjectId.isValid(cliente_id)) {
      return res.status(400).json({ message: "El cliente_id no es válido." });
    }

    const empresas = await Empresa.find(searchCriteria)
      .select("nombre correo telefono -_id")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEmpresas = await Empresa.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalEmpresas / limit),
      totalEmpresas,
      empresas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar empresas",
      errorMessage: error.message,
    });
  }
};

const changeActive = async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    const active = !empresa.activo;
    await Empresa.findByIdAndUpdate(req.params.id, { activo: active });

    res.status(200).json({ message: "Estado de empresa actualizado" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el estado de la empresa",
      error: error.message,
    });
  }
};

// Cambiar el rol activo de la empresa
const changeRoleActivo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { role_id } = req.body;

  try {
    const roleExists = await Roles.findById(role_id);
    if (!roleExists) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    const empresa = await Empresa.findById(id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    if (!empresa.roles.includes(role_id)) {
      return res.status(400).json({
        message: "El rol especificado no está asociado a esta empresa.",
      });
    }

    empresa.active_role = role_id;
    await empresa.save();

    res.status(200).json({
      message: "Rol activo actualizado con éxito",
      active_role: empresa.active_role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

// Agregar un rol a la empresa
const addRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { role_id } = req.body;

  try {
    const roleExists = await Roles.findById(role_id);
    if (!roleExists) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    const empresa = await Empresa.findById(id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    if (empresa.roles.includes(role_id)) {
      return res
        .status(400)
        .json({ message: "El rol ya está asignado a la empresa." });
    }

    empresa.roles.push(role_id);
    await empresa.save();

    res.status(200).json({
      message: "Rol agregado con éxito",
      roles: empresa.roles,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

// Eliminar un rol de la empresa
const removeRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { role_id } = req.body;

  try {
    const empresa = await Empresa.findById(id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    if (!empresa.roles.includes(role_id)) {
      return res
        .status(400)
        .json({ message: "El rol no está asignado a la empresa." });
    }

    empresa.roles = empresa.roles.filter((role) => role.toString() !== role_id);
    await empresa.save();

    res.status(200).json({
      message: "Rol eliminado con éxito",
      roles: empresa.roles,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

module.exports = {
  createEmpresa,
  getAllEmpresas,
  getEmpresaById,
  getEmpresaByClienteId,
  updateEmpresa,
  deleteEmpresa,
  changeActive,
  changeRoleActivo,
  addRole,
  removeRole,
};
