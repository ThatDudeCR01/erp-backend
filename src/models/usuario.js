const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  correo: { type: String, unique: true, required: true },
  contraseña: { type: String, required: true },
  cedula: { type: String, unique: true, required: true },
  reiniciar_contraseña_token: { type: String },
  reiniciar_contraseña_token_expira: { type: Date },
  active_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
  ],
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Usuario = mongoose.model("Usuarios", usuarioSchema);

module.exports = Usuario;
