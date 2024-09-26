const mongoose = require("mongoose");

const horasFacturablesSchema = new mongoose.Schema({
  precio: { type: Number, required: true },
  moneda: {
    type: String,
    required: true,
    enum: ["USD", "EUR", "CRC", "MXN"],
    maxlength: 3,
  },
  tipoEmpleado_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoEmpleado",
    required: true,
  },
});

const HorasFacturables = mongoose.model(
  "HorasFacturables",
  horasFacturablesSchema
);
module.exports = HorasFacturables;
