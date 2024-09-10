const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  puesto: { type: String, required: true },
  salario: { type: Number, required: true },
  correo: { type: String, required: true, unique: true },
  cedula: { type: String, required: true, unique: true },
  entidad_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidad",
      required: true,
    },
  ],
});

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
