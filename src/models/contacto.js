const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String },
  estaActivo: { type: Boolean, default: true },
  correo: { type: String, required: true, unique: true },
  cedula: { type: String, required: true, unique: true },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Contacto = mongoose.model("Contactos", contactoSchema);

module.exports = Contacto;
