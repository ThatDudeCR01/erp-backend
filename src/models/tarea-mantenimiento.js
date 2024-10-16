const mongoose = require("mongoose");

const tareaMantenimientoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    descripcion: { type: String, required: true },
    duracion: { type: String, required: true },
    fecha_cobro: { type: Date, required: true },
    template_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
  }
  // {
  //   timestamps: true,
  // }
);

const TareaMantenimiento = mongoose.model(
  "TareaMantenimientos",
  tareaMantenimientoSchema
);

module.exports = TareaMantenimiento;
