const mongoose = require("mongoose");

const mantenimientoSchema = new mongoose.Schema({
  id_empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
  template_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: true,
  },
});

const Mantenimiento = mongoose.model("Mantenimiento", mantenimientoSchema);
module.exports = Mantenimiento;
