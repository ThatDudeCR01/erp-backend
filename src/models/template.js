const templateSchema = new mongoose.Schema({
    nombre: String,
    tareasMantenimiento: [mongoose.Schema.Types.ObjectId]
});

const Template = mongoose.model('Template', templateSchema);