const Mantenimiento = require("../models/mantenimiento");

exports.createMantenimiento = async (req, res) => {
  try {
    const { id_empresa, template_id } = req.body;

    const nuevoMantenimiento = new Mantenimiento({
      id_empresa,
      template_id,
    });

    await nuevoMantenimiento.save();
    res.status(201).json({ message: "Mantenimiento creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear mantenimiento", error: error.message });
  }
};

exports.getAllMantenimientos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { id_empresa: { $regex: filterRegex } },
        { template_id: { $regex: filterRegex } },
      ],
    };

    const mantenimientos = await Mantenimiento.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalMantenimientos = await Mantenimiento.countDocuments(
      searchCriteria
    ).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalMantenimientos / limit),
      totalMantenimientos,
      mantenimientos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar mantenimientos",
      errorMessage: error.message,
    });
  }
};

exports.getMantenimientoById = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }
    res.status(200).json({ message: "Mantenimiento encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar mantenimiento", error: error.message });
  }
};

exports.updateMantenimiento = async (req, res) => {
  try {
    const { id_empresa, template_id } = req.body;

    const mantenimientoActual = await Mantenimiento.findById(req.params.id);
    if (!mantenimientoActual) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (
      id_empresa &&
      id_empresa.toString() !== mantenimientoActual.id_empresa.toString()
    ) {
      updates.id_empresa = id_empresa;
      isModified = true;
    }

    if (
      template_id &&
      template_id.toString() !== mantenimientoActual.template_id.toString()
    ) {
      updates.template_id = template_id;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const mantenimiento = await Mantenimiento.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Mantenimiento actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error al actualizar mantenimiento",
        error: error.message,
      });
  }
};

exports.deleteMantenimiento = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findByIdAndDelete(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }
    res.status(200).json({ message: "Mantenimiento eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar mantenimiento",
        error: error.message,
      });
  }
};
