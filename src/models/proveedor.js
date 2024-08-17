const proveedorSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    cedula: String,
    telefono: String
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);