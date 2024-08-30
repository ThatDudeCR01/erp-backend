const mongoose = require("mongoose");
const Entidad = require("./entidad");

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  puesto: { type: String, required: true },
  salario: { type: Number, required: true },
  correo: { type: Number, required: true },
  identificacion: { type: String, required: true, unique: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoEmpleado",
      required: true,
    },
  ],
});

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
