const contactoSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    telefono: String
});

const Contacto = mongoose.model('Contacto', contactoSchema);