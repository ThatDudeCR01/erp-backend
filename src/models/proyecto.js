const mongoose = require("mongoose");

const proyectoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  duracion: { type: Number, required: true },
  descripcion: { type: String, required: true },
  estaActivo: { type: Boolean },
  empresa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
  horas_facturable_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HorasFacturables",
    required: true,
  },
});

const Proyecto = mongoose.model("Proyectos", proyectoSchema);
module.exports = Proyecto;
