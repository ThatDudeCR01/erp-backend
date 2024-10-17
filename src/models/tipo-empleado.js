const mongoose = require("mongoose");

const tipoEmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  horasFacturables_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HorasFacturables",
    required: true,
  },
  tarifa: [
    {
      precio: { type: Number, required: true },
      descripcion: { type: String, required: true },
    },
  ],
});

const TipoEmpleado = mongoose.model("TipoEmpleados", tipoEmpleadoSchema);
module.exports = TipoEmpleado;
