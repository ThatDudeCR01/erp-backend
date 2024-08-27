const mongoose = require("mongoose");

const entidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: false },
  correo: { type: String, required: true },
  telefono: { type: String, required: false },
  cedula: { type: String, required: true },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const Entidad = mongoose.model("Entidad", entidadSchema);

module.exports = Entidad;
