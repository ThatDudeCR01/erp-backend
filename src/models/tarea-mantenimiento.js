const tareaMantenimientoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
});

const TareaMantenimiento = mongoose.model(
  "TareaMantenimiento",
  tareaMantenimientoSchema
);
