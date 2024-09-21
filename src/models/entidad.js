const mongoose = require("mongoose");

const entidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  activo: { type: Boolean, default: true },
  apellido: { type: String },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String },
  cedula: { type: String, required: true, unique: true },
});

const Entidad = mongoose.model("Entidades", entidadSchema);

module.exports = Entidad;
