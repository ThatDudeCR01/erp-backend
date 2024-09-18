const mongoose = require("mongoose");

const tipoProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
});

const TipoProducto = mongoose.model("TipoProductos", tipoProductoSchema);
module.exports = TipoProducto;
