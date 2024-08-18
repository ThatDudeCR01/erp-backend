const solicitudSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  estaAprobada: { type: Boolean },
  empleadoSolicita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
  administradorGestiona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

//revisar las relaciones empleado y admi
