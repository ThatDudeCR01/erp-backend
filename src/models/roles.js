const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  permisos: { type: mongoose.Schema.Types.Mixed, required: true },
  empleadoSolicita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
});

const Roles = mongoose.model("Roles", rolesSchema);
module.exports = Roles;
