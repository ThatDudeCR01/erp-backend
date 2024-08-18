const tipoEmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precioxHora: { type: Number },
});

const TipoEmpleado = mongoose.model("TipoEmpleado", tipoEmpleadoSchema);
