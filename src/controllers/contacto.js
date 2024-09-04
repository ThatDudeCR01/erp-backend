const Contacto = require("../models/contacto");
const handleValidationErrors = require("../config/validateResult");

const createContacto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, telefono, correo, identificacion, entidad_id } = req.body;
    const checkContacto = await Contacto.findOne({ correo });
    if (checkContacto) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    const nuevoContacto = new Contacto({
      nombre,
      telefono,
      correo,
      identificacion,
      entidad_id,
    });

    await nuevoContacto.save();
    res.status(201).json({ message: "Contacto creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear contacto", error: error.message });
  }
};

const getAllContactos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { apellido: { $regex: filterRegex } },
        { correo: { $regex: filterRegex } },
        { telefono: { $regex: filterRegex } },
      ],
    };

    const contactos = await Contacto.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalContactos = await Contacto.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalContactos / limit),
      totalContactos,
      contactos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar contactos",
      errorMessage: error.message,
    });
  }
};

const getContactoById = async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }
    res.status(200).json({ message: "Contacto encontrado", contacto });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar contacto", error: error.message });
  }
};

const updateContacto = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }
  try {
    const { nombre, apellido, telefono, entidad } = req.body;
    const contactoActual = await Contacto.findById(req.params.id);

    if (!contactoActual) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    // Definir los campos a actualizar
    const campos = { nombre, apellido, telefono, entidad };
    const updates = {};

    // Recorrer los campos y actualizar solo si hay cambios
    Object.keys(campos).forEach((key) => {
      if (
        campos[key] &&
        campos[key].toString() !== contactoActual[key]?.toString()
      ) {
        updates[key] = campos[key];
      }
    });

    // Verificar si hay cambios
    if (Object.keys(updates).length === 0) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    // Actualizar el contacto
    const contacto = await Contacto.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Contacto actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar contacto", error: error.message });
  }
};

const deleteContacto = async (req, res) => {
  try {
    const contacto = await Contacto.findByIdAndDelete(req.params.id);
    if (!contacto) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }
    res.status(200).json({ message: "Contacto eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar contacto", error: error.message });
  }
};

module.exports = {
  createContacto,
  getAllContactos,
  getContactoById,
  updateContacto,
  deleteContacto,
};