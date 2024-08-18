const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  cedula: { type: String, required: true },
});

const Empleado = mongoose.model("Empleado", empleadoSchema);

//cedula es un number o string??
