const mantenimientoSchema = new mongoose.Schema({
    id_empresa: mongoose.Schema.Types.ObjectId
});

const Mantenimiento = mongoose.model('Mantenimiento', mantenimientoSchema);