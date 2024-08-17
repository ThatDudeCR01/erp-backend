const empleadoSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    cedula: String,
    telefono: String
});

const Empleado = mongoose.model('Empleado', empleadoSchema);