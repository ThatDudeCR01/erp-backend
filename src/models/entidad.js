const entidadSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    cedula: String,
    telefono: String
});

const Entidad = mongoose.model('Entidad', entidadSchema);