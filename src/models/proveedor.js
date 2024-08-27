const mongoose = require("mongoose");
const Entidad = require("./entidad");

const proveedorSchema = new mongoose.Schema({
  empresa: { type: String, required: true }, // Nombre de la empresa del proveedor
  entidad_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidad",
    },
  ],
});

const Proveedor = Entidad.discriminator("Proveedor", proveedorSchema);

module.exports = Proveedor;
