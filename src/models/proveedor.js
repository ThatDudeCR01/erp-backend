const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: false },
  identificacion: { type: String, required: true },
  entidad_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidad",
    },
  ],
});

const Proveedor = mongoose.model("Proveedor", proveedorSchema);

module.exports = Proveedor;
