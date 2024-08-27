const mongoose = require("mongoose");

const tareaMantenimientoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String, required: true },
});

const TareaMantenimiento = mongoose.model(
  "TareaMantenimiento",
  tareaMantenimientoSchema
);

module.exports = TareaMantenimiento;
