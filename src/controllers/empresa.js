const Empresa = require("../models/empresa");

exports.createEmpresa = async (req, res) => {
  try {
    const { nombre, correo, cliente_id, tieneMantenimiento } = req.body;

    const nuevaEmpresa = new Empresa({
      nombre,
      correo,
      cliente_id,
      tieneMantenimiento,
    });

    await nuevaEmpresa.save();
    res.status(201).json({ message: "Empresa creada exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear empresa", error: error.message });
  }
};

exports.getAllEmpresas = async (req, res) => {
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

exports.getEmpresaById = async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    res.status(200).json({ message: "Empresa encontrada" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar empresa", error: error.message });
  }
};

exports.updateEmpresa = async (req, res) => {
  try {
    const { nombre, correo, cliente_id, tieneMantenimiento } = req.body;

    const empresaActual = await Empresa.findById(req.params.id);
    if (!empresaActual) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== empresaActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (correo && correo !== empresaActual.correo) {
      updates.correo = correo;
      isModified = true;
    }

    if (
      cliente_id &&
      cliente_id.toString() !== empresaActual.cliente_id.toString()
    ) {
      updates.cliente_id = cliente_id;
      isModified = true;
    }

    if (
      typeof tieneMantenimiento !== "undefined" &&
      tieneMantenimiento !== empresaActual.tieneMantenimiento
    ) {
      updates.tieneMantenimiento = tieneMantenimiento;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const empresa = await Empresa.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Empresa actualizada con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar empresa", error: error.message });
  }
};

exports.deleteEmpresa = async (req, res) => {
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
