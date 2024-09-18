const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  correo: { type: String, required: true },
  telefono: { type: String },
  cedula: { type: String, required: true, unique: true },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
  active_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
  ],
});

const Cliente = mongoose.model("Clientes", clienteSchema);

module.exports = Cliente;
