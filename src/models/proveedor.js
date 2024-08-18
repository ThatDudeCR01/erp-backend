const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  cedula: { type: String, required: true },
});

const Proveedor = mongoose.model("Proveedor", proveedorSchema);

/* 

persona, empleado, proveedor y contacto tiene la mismoa informacion, podriamos manejarlo asi o igual por separado

const basePersonaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    cedula: { type: String, required: true },
    telefono: { type: String, required: true }
}, { discriminatorKey: 'tipo' });

const Persona = mongoose.model('Persona', basePersonaSchema);

const Empleado = Persona.discriminator('Empleado', new mongoose.Schema({}));
const Proveedor = Persona.discriminator('Proveedor', new mongoose.Schema({}));
const Contacto = Persona.discriminator('Contacto', new mongoose.Schema({}));
*/
