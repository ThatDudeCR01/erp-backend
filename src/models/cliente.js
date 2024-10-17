const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estaActivo: { type: Boolean, default: true },
  apellido: { type: String },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String },
  cedula: { type: String, required: true, unique: true },
  tarifa: [
    {
      precio: { type: Number, required: true },
      descripcion: { type: String, required: true },
    },
  ],
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Cliente = mongoose.model("Clientes", clienteSchema);

module.exports = Cliente;
