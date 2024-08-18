const mantenimientoSchema = new mongoose.Schema({
  id_empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
});

const Mantenimiento = mongoose.model("Mantenimiento", mantenimientoSchema);
