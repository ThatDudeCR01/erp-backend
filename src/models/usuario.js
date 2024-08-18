const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
  contraseña: { type: String, required: true },
  cedula: { type: String, unique: true, required: true },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
