const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estaActivo: { type: Boolean, default: true },
  apellido: { type: String },
  cedula: { type: String, required: true, unique: true },
  correo: { type: String, unique: true },
  telefono: { type: String },
  salario: { type: Number },
  entidad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidad",
    required: true,
  },
  tipo_empleado_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoEmpelado",
    required: true,
  },
});

const Empleado = mongoose.model("Empleados", empleadoSchema);

module.exports = Empleado;
