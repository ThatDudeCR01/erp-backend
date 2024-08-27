const Roles = require("../models/roles");

exports.createRol = async (req, res) => {
  try {
    const { nombre, permisos, empleadoSolicita } = req.body;

    const nuevoRol = new Roles({
      nombre,
      permisos,
      empleadoSolicita,
    });

    await nuevoRol.save();
    res.status(201).json({ message: "Rol creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear rol", error: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
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

exports.getRolById = async (req, res) => {
  try {
    const rol = await Roles.findById(req.params.id);
    if (!rol) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json({ message: "Rol encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar rol", error: error.message });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const { nombre, permisos, empleadoSolicita } = req.body;

    const rolActual = await Roles.findById(req.params.id);
    if (!rolActual) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== rolActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (
      permisos &&
      JSON.stringify(permisos) !== JSON.stringify(rolActual.permisos)
    ) {
      updates.permisos = permisos;
      isModified = true;
    }

    if (
      empleadoSolicita &&
      empleadoSolicita.toString() !== rolActual.empleadoSolicita.toString()
    ) {
      updates.empleadoSolicita = empleadoSolicita;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const rol = await Roles.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
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

exports.deleteRol = async (req, res) => {
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
