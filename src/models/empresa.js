const mongoose = require("mongoose");

const empresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estaActivo: { type: Boolean, default: true },
  correo: { type: String, required: true, match: /.+\@.+\..+/ },
  tieneMantenimiento: { type: Boolean, default: false },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
});

const Empresa = mongoose.model("Empresas", empresaSchema);

module.exports = Empresa;
