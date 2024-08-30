const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: false },
  identificacion: { type: String, required: true },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
