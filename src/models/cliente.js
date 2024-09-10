const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: false },
  cedula: { type: String, required: true, unique: true },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
