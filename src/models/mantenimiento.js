const mongoose = require("mongoose");

const mantenimientoSchema = new mongoose.Schema({
  empresa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
});

const Mantenimiento = mongoose.model("Mantenimientos", mantenimientoSchema);
module.exports = Mantenimiento;
