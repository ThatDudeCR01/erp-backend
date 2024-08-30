const mongoose = require("mongoose");
const Entidad = require("./entidad");

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefeno: { type: String, required: true },
  correo: { type: String, required: true },
  identificacion: { type: String, required: true },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  }, // Referencia a la entidad asociada al contacto
});

const Contacto = mongoose.model("Contacto", contactoSchema);

module.exports = Contacto;

//Listo
