const mongoose = require("mongoose");
const Entidad = require("./entidad");

const empleadoSchema = new mongoose.Schema({
  puesto: { type: String, required: true },
  salario: { type: Number, required: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoEmpleado",
      required: true,
    },
  ],
});

const Empleado = Entidad.discriminator("Empleado", empleadoSchema);

module.exports = Empleado;

/*roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
  ],
  solicitudes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solicitud",
    },
  ],*/
