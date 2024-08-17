const empresaSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    cliente_id: mongoose.Schema.Types.ObjectId,
    tieneMantenimiento: Boolean
});

const Empresa = mongoose.model('Empresa', empresaSchema);