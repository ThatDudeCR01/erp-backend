const entidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  cedula: { type: String, required: true },
});

const Entidad = mongoose.model("Entidad", entidadSchema);
