const Roles = require("../models/roles");

const createRole = async (req, res) => {
  try {
    const { nombre, permisos } = req.body;

    const checkRol = await Roles.findOne({ nombre });
    if (checkRol) {
      return res.status(400).json({
        message: "Ya existe un rol con el nombre proporcionado",
      });
    }

    const nuevoRole = new Roles({
      nombre,
      permisos,
    });

    await nuevoRole.save();
    res.status(201).json({ message: "Rol creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear rol", error: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [{ nombre: { $regex: filterRegex } }],
    };

    const roles = await Roles.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalRoles = await Roles.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalRoles / limit),
      totalRoles,
      roles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar roles",
      errorMessage: error.message,
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Roles.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar rol", error: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const check = await Roles.findById(req.params.id);

    if (!check) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    if (req.body.nombre) {
      const checkRol = await Roles.findOne({ nombre: req.body.nombre });
      if (checkRol) {
        return res.status(400).json({
          message: "Ya existe un rol con el nombre proporcionado",
        });
      }
    }

    await Roles.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Rol actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar rol", error: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const rol = await Roles.findByIdAndDelete(req.params.id);
    if (!rol) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json({ message: "Rol eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar rol", error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
