const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaCreacion: {
    type: Date,
    require: true,
  },
  fechaResuelto: {
    type: Date,
  },
  descripcion: { type: String },
  estaAprobada: { type: Boolean, default: false },

  empleadoSolicita_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
  empleadoAprueba_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

const Solicitud = mongoose.model("Solicitudes", solicitudSchema);
module.exports = Solicitud;
