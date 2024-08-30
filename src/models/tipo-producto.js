const mongoose = require("mongoose");

const tipoProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  unidad: { type: String, required: true },
  descripcion: { type: String, required: false },
  producto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
});

const TipoProducto = mongoose.model("TipoProducto", tipoProductoSchema);
module.exports = TipoProducto;
