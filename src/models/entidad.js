const mongoose = require("mongoose");

const entidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estaActivo: { type: Boolean, default: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String },
  cedula: { type: String, required: true, unique: true },
});

const Entidad = mongoose.model("Entidades", entidadSchema);

module.exports = Entidad;
