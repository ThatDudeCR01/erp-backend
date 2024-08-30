const mongoose = require("mongoose");

const entidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: false },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: false },
  identificacion: { type: String, required: true, unique: true },
});

const Entidad = mongoose.model("Entidad", entidadSchema);

module.exports = Entidad;
