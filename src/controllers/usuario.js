const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const handleValidationErrors = require("../config/validateResult");

exports.createUsuario = async (req, res) => {
  if (handleValidationErrors(req, res)) {
    return;
  }

  try {
    const { nombre, apellido, correo, contraseña, cedula, entidad_id } =
      req.body;

    const checkUser = await Usuario.findOne({ correo });
    if (checkUser) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      correo,
      contraseña: hashedPassword,
      cedula,
      entidad_id,
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear usuario", error: error.message });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    // Crear una expresión regular para la búsqueda insensible a mayúsculas/minúsculas
    const filterRegex = new RegExp(filter, "i");

    // Definir los criterios de búsqueda
    const searchCriteria = {
      $or: [
        { nombre: { $regex: filterRegex } },
        { apellido: { $regex: filterRegex } },
        { correo: { $regex: filterRegex } },
        { cedula: { $regex: filterRegex } },
      ],
    };

    // Obtener usuarios con los criterios de búsqueda, paginación y límites
    const usuarios = await Usuario.find(searchCriteria)
      .select("id nombre correo")
      .skip(skip)
      .limit(limit)
      .exec();

    // Obtener el total de documentos que cumplen con los criterios de búsqueda
    const totalUsuarios = await Usuario.countDocuments(searchCriteria).exec();

    // Enviar la respuesta con los resultados
    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalUsuarios / limit),
      totalUsuarios,
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar usuarios",
      errorMessage: error.message,
    });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar usuario", error: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, apellido, telefono, contraseña, entidad } = req.body;

    const usuarioActual = await Usuario.findById(req.param3s.id);
    if (!usuarioActual) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updates = {};
    let isModified = false;

    if (nombre && nombre !== usuarioActual.nombre) {
      updates.nombre = nombre;
      isModified = true;
    }

    if (apellido && apellido !== usuarioActual.apellido) {
      updates.apellido = apellido;
      isModified = true;
    }

    if (telefono && telefono !== usuarioActual.telefono) {
      updates.telefono = telefono;
      isModified = true;
    }

    if (
      entidad &&
      usuarioActual.entidad &&
      entidad.toString() !== usuarioActual.entidad.toString()
    ) {
      updates.entidad = entidad;
      isModified = true;
    } else if (entidad && !usuarioActual.entidad) {
      updates.entidad = entidad;
      isModified = true;
    }

    if (
      contraseña &&
      !(await bcrypt.compare(contraseña, usuarioActual.contraseña))
    ) {
      const salt = await bcrypt.genSalt(10);
      updates.contraseña = await bcrypt.hash(contraseña, salt);
      isModified = true;
    }

    // Verificar si hubo algún cambio
    if (!isModified) {
      return res.status(200).json({
        message: "La información es la misma, no se realizaron cambios.",
      });
    }

    // Actualizar el usuario si hubo cambios
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar usuario", error: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};
