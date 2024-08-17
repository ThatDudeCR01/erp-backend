const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    tipo: [String]
});

const Producto = mongoose.model('Producto', productoSchema);