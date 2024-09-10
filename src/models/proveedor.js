const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String },
  cedula: { type: String, required: true, unique: true },
  entidad_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidad",
      require: true,
    },
  ],
});

const Proveedor = mongoose.model("Proveedor", proveedorSchema);

module.exports = Proveedor;
