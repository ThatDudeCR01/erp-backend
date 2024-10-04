const Proveedor = require("../models/proveedor");
const handleValidationErrors = require("../config/validateResult");

const createProveedor = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, correo, telefono, cedula, entidad_id } = req.body;

    const nuevoProveedor = new Proveedor({
      nombre,
      correo,
      telefono,
      cedula,
      entidad_id,
    });

    await nuevoProveedor.save();
    res.status(201).json({ message: "Proveedor creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear proveedor", error: error.message });
  }
};

const getAllProveedores = async (req, res) => {
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
        { telefono: { $regex: filterRegex } },
      ],
    };

    const proveedores = await Proveedor.find(searchCriteria)
      .select("nombre correo telefono -_id")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalProveedores = await Proveedor.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalProveedores / limit),
      totalProveedores,
      proveedores,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar proveedores",
      errorMessage: error.message,
    });
  }
};

const getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id).select(
      "nombre correo telefono -_id"
    );
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json({ proveedor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar proveedor", error: error.message });
  }
};

const updateProveedor = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const proveedorActual = await Proveedor.findById(req.params.id);
    if (!proveedorActual) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    await Proveedor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Proveedor actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar proveedor", error: error.message });
  }
};

const deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json({ message: "Proveedor eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar proveedor", error: error.message });
  }
};

module.exports = {
  createProveedor,
  getAllProveedores,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
};
