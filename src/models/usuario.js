const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, unique: true, required: true },
  contraseña: { type: String, required: true },
  cedula: { type: String, unique: true, required: true },
  entidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: false,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
