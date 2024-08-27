const mongoose = require("mongoose");

const horasFacturablesSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  id_proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto",
    required: false,
  },
  id_tipoEmpleado: {
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

//cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
