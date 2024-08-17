const tareasMantenimientoSchema = new mongoose.Schema({
    nombre: String,
    tipo: String
});

const TareasMantenimiento = mongoose.model('TareasMantenimiento', tareasMantenimientoSchema);