const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  identificacion: { type: String, required: true, unique: true },
  correo: { type: String },
  telefono: { type: String },
  salario: { type: Number },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
});

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
