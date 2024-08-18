const proyectoSchema = new mongoose.Schema({
  nombre: String,
  duracion: Number,
  descripcion: String,
  empresa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
});

const Proyecto = mongoose.model("Proyecto", proyectoSchema);
