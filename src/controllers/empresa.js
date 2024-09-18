const Empresa = require("../models/empresa");
const handleValidationErrors = require("../config/validateResult");
const { getUpdatedFields } = require("../utils/fieldUtils");

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

module.exports = {
  createEmpresa,
  getAllEmpresas,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa,
};
