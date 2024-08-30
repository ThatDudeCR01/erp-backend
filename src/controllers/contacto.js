const Contacto = require("../models/contacto");

exports.createContacto = async (req, res) => {
  try {
    const { nombre, telefono, correo, identificacion, entidad } = req.body;

    const nuevoContacto = new Contacto({
      nombre,
      telefono,
      correo,
      identificacion,
      entidad,
    });

    await nuevoContacto.save();
    res.status(201).json({ message: "Contacto creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear contacto", error: error.message });
  }
};

exports.getAllContactos = async (req, res) => {
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

exports.getContactoById = async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }
    res.status(200).json({ message: "Contacto encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar contacto", error: error.message });
  }
};

exports.updateContacto = async (req, res) => {
  try {
    const { nombre, apellido, telefono, entidad } = req.body;

    const contactoActual = await Contacto.findById(req.params.id);
    if (!contactoActual) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== contactoActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (apellido && apellido !== contactoActual.apellido) {
      updates.apellido = apellido;
      isModified = true;
    }

    if (telefono && telefono !== contactoActual.telefono) {
      updates.telefono = telefono;
      isModified = true;
    }

    if (
      entidad &&
      contactoActual.entidad &&
      entidad.toString() !== contactoActual.entidad.toString()
    ) {
      updates.entidad = entidad;
      isModified = true;
    } else if (entidad && !contactoActual.entidad) {
      updates.entidad = entidad;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

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

exports.deleteContacto = async (req, res) => {
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
