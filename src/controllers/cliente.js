const Cliente = require("../models/cliente");

exports.createCliente = async (req, res) => {
  try {
    const { nombre, apellido, correo, cedula, entidad } = req.body;

    const nuevoCliente = new Cliente({
      nombre,
      apellido,
      correo,
      cedula,
      entidad,
    });

    await nuevoCliente.save();
    res.status(201).json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear cliente", error: error.message });
  }
};

exports.getAllClientes = async (req, res) => {
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
        { cedula: { $regex: filterRegex } },
      ],
    };

    const clientes = await Cliente.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalClientes = await Cliente.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalClientes / limit),
      totalClientes,
      clientes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar clientes",
      errorMessage: error.message,
    });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar cliente", error: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const { nombre, apellido, telefono, entidad } = req.body;

    const clienteActual = await Cliente.findById(req.params.id);
    if (!clienteActual) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== clienteActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (apellido && apellido !== clienteActual.apellido) {
      updates.apellido = apellido;
      isModified = true;
    }

    if (telefono && telefono !== clienteActual.telefono) {
      updates.telefono = telefono;
      isModified = true;
    }

    if (
      entidad &&
      clienteActual.entidad &&
      entidad.toString() !== clienteActual.entidad.toString()
    ) {
      updates.entidad = entidad;
      isModified = true;
    } else if (entidad && !clienteActual.entidad) {
      updates.entidad = entidad;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Cliente actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar cliente", error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar cliente", error: error.message });
  }
};
