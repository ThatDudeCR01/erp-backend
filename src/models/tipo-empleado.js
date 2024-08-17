const tipoEmpleadoSchema = new mongoose.Schema({
    nombre: String,
    precioxHora: Number
});

const TipoEmpleado = mongoose.model('TipoEmpleado', tipoEmpleadoSchema);