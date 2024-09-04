const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  identificacion: { type: String, required: true, unique: true },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Contacto = mongoose.model("Contacto", contactoSchema);

module.exports = Contacto;
