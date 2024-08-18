const rolesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  permisos: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Roles = mongoose.model("Roles", rolesSchema);

//revisar si esta bien
