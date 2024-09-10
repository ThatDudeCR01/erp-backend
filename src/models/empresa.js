const mongoose = require("mongoose");

const empresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, match: /.+\@.+\..+/ },
  tieneMantenimiento: { type: Boolean },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
});

const Empresa = mongoose.model("Empresa", empresaSchema);

module.exports = Empresa;
