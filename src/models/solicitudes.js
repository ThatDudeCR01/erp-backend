const mongoose = require("mongoose");
const moment = require("moment-timezone");

const solicitudSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaCreacion: {
    type: Date,
    default: () => moment().tz("America/Costa_Rica").toDate(),
  },
  fechaResuelto: {
    type: Date,
    set: (date) => moment(date).tz("America/Costa_Rica").toDate(),
  },
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
  },
});

const Solicitud = mongoose.model("Solicitudes", solicitudSchema);
module.exports = Solicitud;
