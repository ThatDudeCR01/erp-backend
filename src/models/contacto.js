const mongoose = require("mongoose");
const Entidad = require("./entidad");

const contactoSchema = new mongoose.Schema({
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  }, // Referencia a la entidad asociada al contacto
});

const Contacto = Entidad.discriminator("Contacto", contactoSchema);

module.exports = Contacto;

//Listo
