const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  estaAprobada: { type: Boolean, default: false },
  empleadoSolicita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const Solicitud = mongoose.model("Solicitud", solicitudSchema);
module.exports = Solicitud;

//seria necesario, agregar a la solicitud un encargado o administrador para revisar solicitudes pendientes, activas etc
/*
 */
