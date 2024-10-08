const mongoose = require("mongoose");

const mantenimientoSchema = new mongoose.Schema({
  empresa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
  template_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: true,
  },
  tareas: [
    {
      nombre: { type: String, required: true },
      tipo: { type: String, required: true },
      descripcion: { type: String, required: true },
      duracion: { type: String, required: true },
    },
  ],
});

const Mantenimiento = mongoose.model("Mantenimientos", mantenimientoSchema);
module.exports = Mantenimiento;
