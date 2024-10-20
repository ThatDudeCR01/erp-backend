const Proyecto = require("../models/proyecto");
const Cliente = require("../models/cliente");
const Empresa = require("../models/empresa");
const handleValidationErrors = require("../config/validateResult");

const createProyecto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }

  try {
    const {
      nombre,
      duracion,
      descripcion,
      referencia,
      referenciaModelo,
      horas_facturable_id,
    } = req.body;

    if (!["Cliente", "Empresa"].includes(referenciaModelo)) {
      return res
        .status(400)
        .json({ error: "El modelo de referencia debe ser Cliente o Empresa" });
    }

    let referenciaExiste;
    if (referenciaModelo === "Cliente") {
      referenciaExiste = await Cliente.findById(referencia);
    } else if (referenciaModelo === "Empresa") {
      referenciaExiste = await Empresa.findById(referencia);
    }

    if (!referenciaExiste) {
      return res.status(404).json({
        error: `No se encontró el ${referenciaModelo.toLowerCase()} con ese ID`,
      });
    }

    const nuevoProyecto = new Proyecto({
      nombre,
      duracion,
      descripcion,
      referencia,
      referenciaModelo,
      horas_facturable_id,
    });

    await nuevoProyecto.save();

    res.status(201).json({
      message: "Proyecto creado exitosamente",
      proyecto: nuevoProyecto,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear proyecto", error: error.message });
  }
};

const getAllProyectos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { descripcion: { $regex: filterRegex } },
      ],
    };

    const proyectos = await Proyecto.find(searchCriteria)
      .select(" -_id")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalProyectos = await Proyecto.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalProyectos / limit),
      totalProyectos,
      proyectos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar proyectos",
      errorMessage: error.message,
    });
  }
};

const getProyectoById = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id).select("-_id");
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json({ proyecto });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar proyecto", error: error.message });
  }
};

const updateProyecto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, duracion, descripcion } = req.body;

    const proyectoActual = await Proyecto.findById(req.params.id);
    if (!proyectoActual) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    await Proyecto.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Proyecto actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar proyecto", error: error.message });
  }
};

const deleteProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json({ message: "Proyecto eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar proyecto", error: error.message });
  }
};

module.exports = {
  createProyecto,
  getAllProyectos,
  getProyectoById,
  updateProyecto,
  deleteProyecto,
};
