const contactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true }
});

const Contacto = mongoose.model('Contacto', contactoSchema);