const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  estaActivo: { type: Boolean, default: true },
  tipoProducto_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoProducto",
      required: true,
    },
  ],
  proveedor_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proveedores",
      required: true,
    },
  ],
});

const Producto = mongoose.model("Productos", productoSchema);
module.exports = Producto;
