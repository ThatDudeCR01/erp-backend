const mongoose = require("mongoose");

const facturaSchema = new mongoose.Schema({
  referencia: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "referenciaModelo",
  },
  referenciaModelo: {
    type: String,
    required: true,
    enum: ["Cliente", "Empresa"],
  },
  tipo_factura: {
    type: String,
    required: true,
  },

  linea_detalle_producto: [
    {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      cantidad: { type: Number, required: true },
      total_producto: { type: Number, required: true },
      producto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
    },
    ,
  ],

  linea_detalle_proyecto: {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    proyecto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proyecto",
      required: true,
    },
  },
});

const Factura = mongoose.model("Factura", facturaSchema);

module.exports = Factura;
