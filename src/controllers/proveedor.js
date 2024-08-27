const Proveedor = require("../models/proveedor");

exports.createProveedor = async (req, res) => {
  try {
    const { nombre, correo, telefono, cedula, empresa, entidad_id } = req.body;

    const nuevoProveedor = new Proveedor({
      nombre,
      correo,
      telefono,
      cedula,
      empresa,
      entidad_id,
      // empresa y entidad_id se asignarían aquí como antes
    });

    await nuevoProveedor.save();
    res.status(201).json({ message: "Proveedor creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear proveedor", error: error.message });
  }
};

exports.getAllProveedores = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { empresa: { $regex: filterRegex } },
        { entidad_id: { $regex: filterRegex } },
      ],
    };

    const proveedores = await Proveedor.find(searchCriteria)
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

exports.getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json({ message: "Proveedor encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar proveedor", error: error.message });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const { empresa, entidad_id } = req.body;

    const proveedorActual = await Proveedor.findById(req.params.id);
    if (!proveedorActual) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (empresa && empresa !== proveedorActual.empresa) {
      updates.empresa = empresa;
      isModified = true;
    }

    if (
      entidad_id &&
      entidad_id.toString() !== proveedorActual.entidad_id.toString()
    ) {
      updates.entidad_id = entidad_id;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Proveedor actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar proveedor", error: error.message });
  }
};

exports.deleteProveedor = async (req, res) => {
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
