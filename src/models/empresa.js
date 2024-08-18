const empresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, match: /.+\@.+\..+/ },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  tieneMantenimiento: { type: Boolean },
});

const Empresa = mongoose.model("Empresa", empresaSchema);

//revisar la relacion entre empresa y cliente
