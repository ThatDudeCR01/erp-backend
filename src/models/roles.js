const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  permisos: {
    type: [
      {
        tabla: { type: String, required: true },
        create: { type: Boolean, required: true },
        read: { type: Boolean, required: true },
        update: { type: Boolean, required: true },
        delete: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
});

const Roles = mongoose.model("Roles", rolesSchema);

module.exports = Roles;
