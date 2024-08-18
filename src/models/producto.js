const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  tipo: { type: [String], required: true },
});

const Producto = mongoose.model("Producto", productoSchema);

//revisar
