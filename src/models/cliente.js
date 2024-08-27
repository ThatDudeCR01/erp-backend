const mongoose = require("mongoose");
const Entidad = require("./entidad");

const clienteSchema = new mongoose.Schema({
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Cliente = Entidad.discriminator("Cliente", clienteSchema);

module.exports = Cliente;
