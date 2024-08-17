const proyectoSchema = new mongoose.Schema({
    nombre: String,
    duracion: Number,
    descripcion: String,
    empresa_id: mongoose.Schema.Types.ObjectId
});

const Proyecto = mongoose.model('Proyecto', proyectoSchema);