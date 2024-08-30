const mongoose = require("mongoose");

const proyectoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  duracion: { type: Number, required: true },
  descripcion: { type: String, required: true },
  empresa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
});

const Proyecto = mongoose.model("Proyecto", proyectoSchema);
module.exports = Proyecto;
