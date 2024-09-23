const mongoose = require("mongoose");

const tipoEmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  horasFacturables_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HorasFacturables",
    required: true,
  },
  empleado_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
});

const TipoEmpleado = mongoose.model("TipoEmpleados", tipoEmpleadoSchema);
module.exports = TipoEmpleado;
