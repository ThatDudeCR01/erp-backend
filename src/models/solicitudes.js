const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true }, //por defecto la fecha de hoy
  descripcion: { type: String, required: false },
  estaAprobada: { type: Boolean, default: false },
  empleadoSolicita_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
  empleadoAprueba_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const Solicitud = mongoose.model("Solicitudes", solicitudSchema);
module.exports = Solicitud;

//seria necesario, agregar a la solicitud un encargado o administrador para revisar solicitudes pendientes, activas etc
/*
 */
