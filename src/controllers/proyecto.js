const Proyecto = require("../models/proyecto");

exports.createProyecto = async (req, res) => {
  try {
    const { nombre, duracion, descripcion, empresa_id } = req.body;

    const nuevoProyecto = new Proyecto({
      nombre,
      duracion,
      descripcion,
      empresa_id,
    });

    await nuevoProyecto.save();
    res.status(201).json({ message: "Proyecto creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear proyecto", error: error.message });
  }
};

exports.getAllProyectos = async (req, res) => {
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

exports.getProyectoById = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json({ message: "Proyecto encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar proyecto", error: error.message });
  }
};

exports.updateProyecto = async (req, res) => {
  try {
    const { nombre, duracion, descripcion, empresa_id } = req.body;

    const proyectoActual = await Proyecto.findById(req.params.id);
    if (!proyectoActual) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== proyectoActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (duracion && duracion !== proyectoActual.duracion) {
      updates.duracion = duracion;
      isModified = true;
    }

    if (descripcion && descripcion !== proyectoActual.descripcion) {
      updates.descripcion = descripcion;
      isModified = true;
    }

    if (
      empresa_id &&
      empresa_id.toString() !== proyectoActual.empresa_id.toString()
    ) {
      updates.empresa_id = empresa_id;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const proyecto = await Proyecto.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
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

exports.deleteProyecto = async (req, res) => {
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
