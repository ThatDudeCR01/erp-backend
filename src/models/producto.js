const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
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
      ref: "Proveedor",
      required: true,
    },
  ],
});

const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;
