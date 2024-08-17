const horasFacturablesSchema = new mongoose.Schema({
    id_proyecto: mongoose.Schema.Types.ObjectId,
    id_tipoEmpleado: mongoose.Schema.Types.ObjectId
});

const HorasFacturables = mongoose.model('HorasFacturables', horasFacturablesSchema);