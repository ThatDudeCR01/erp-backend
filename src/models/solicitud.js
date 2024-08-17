const solicitudSchema = new mongoose.Schema({
    nombre: String,
    fecha: Date,
    estaAprobada: Boolean,
    empleadoSolicita: mongoose.Schema.Types.ObjectId,
    administradorGestiona: mongoose.Schema.Types.ObjectId
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);