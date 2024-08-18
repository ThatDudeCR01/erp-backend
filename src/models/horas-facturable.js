const horasFacturablesSchema = new mongoose.Schema({
  id_proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto",
    required: true,
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

//cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
