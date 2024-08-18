const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const usuarioRoutes = require("./routes/usuarios");
const rolesRoutes = require("./routes/roles");
const empleadoRoutes = require("./routes/empleados");
const proveedorRoutes = require("./routes/proveedores");
const contactoRoutes = require("./routes/contactos");
const empresaRoutes = require("./routes/empresas");
const proyectoRoutes = require("./routes/proyectos");
const entidadRoutes = require("./routes/entidades");
const horasFacturablesRoutes = require("./routes/horasFacturables");
const solicitudesRoutes = require("./routes/solicitudes");
const productoRoutes = require("./routes/productos");
const tipoProductoRoutes = require("./routes/tipoProductos");
const mantenimientoRoutes = require("./routes/mantenimientos");
const templateRoutes = require("./routes/templates");
const tareasMantenimientoRoutes = require("./routes/tareasMantenimientos");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/contactos", contactoRoutes);
app.use("/api/empresas", empresaRoutes);
app.use("/api/entidades", entidadRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/horas-facturables", horasFacturablesRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/tipo-productos", tipoProductoRoutes);
app.use("/api/mantenimientos", mantenimientoRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/tareas-mantenimiento", tareasMantenimientoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
