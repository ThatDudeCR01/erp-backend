const Empleado = require("../models/empleado");

exports.createEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, puesto, salario, entidad } =
      req.body;

    const nuevoEmpleado = new Empleado({
      nombre,
      apellido,
      correo,
      telefono,
      puesto,
      salario,
      entidad,
    });

    await nuevoEmpleado.save();
    res.status(201).json({ message: "Empleado creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear empleado", error: error.message });
  }
};

exports.getAllEmpleados = async (req, res) => {
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
        { puesto: { $regex: filterRegex } },
      ],
    };

    const empleados = await Empleado.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEmpleados = await Empleado.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalEmpleados / limit),
      totalEmpleados,
      empleados,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar empleados",
      errorMessage: error.message,
    });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json({ message: "Empleado encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar empleado", error: error.message });
  }
};

exports.updateEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, telefono, puesto, salario, entidad } = req.body;

    const empleadoActual = await Empleado.findById(req.params.id);
    if (!empleadoActual) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== empleadoActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (apellido && apellido !== empleadoActual.apellido) {
      updates.apellido = apellido;
      isModified = true;
    }

    if (telefono && telefono !== empleadoActual.telefono) {
      updates.telefono = telefono;
      isModified = true;
    }

    if (puesto && puesto !== empleadoActual.puesto) {
      updates.puesto = puesto;
      isModified = true;
    }

    if (salario && salario !== empleadoActual.salario) {
      updates.salario = salario;
      isModified = true;
    }

    if (
      entidad &&
      empleadoActual.entidad &&
      entidad.toString() !== empleadoActual.entidad.toString()
    ) {
      updates.entidad = entidad;
      isModified = true;
    } else if (entidad && !empleadoActual.entidad) {
      updates.entidad = entidad;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Empleado actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar empleado", error: error.message });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json({ message: "Empleado eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar empleado", error: error.message });
  }
};
