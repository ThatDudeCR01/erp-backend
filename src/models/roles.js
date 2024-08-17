const rolesSchema = new mongoose.Schema({
    nombre: String,
    json: mongoose.Schema.Types.Mixed
});

const Roles = mongoose.model('Roles', rolesSchema);