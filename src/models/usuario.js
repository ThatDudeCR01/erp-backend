const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: { type: String, unique: true },
    contraseña: String,
    cedula: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);