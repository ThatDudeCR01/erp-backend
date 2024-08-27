const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const login = require("./login");

const cliente = require("./clientes");
const usuario = require("./usuarios");
const roles = require("./roles");
const empleado = require("./empleados");
const proveedor = require("./proveedores");
const contacto = require("./contactos");
const entidad = require("./entidades");
const empresa = require("./empresas");
const producto = require("./productos");
const proyecto = require("./proyectos");
const solicitud = require("./solicitudes");
const tareasManteniento = require("./tareasMantenimientos");
const horasFacturables = require("./horasFacturables");
const mantenimiento = require("./mantenimientos");
const template = require("./templates");
const tipoProducto = require("./tipoProductos");

//rutas publicas
router.use("/login", login);

//rutas privadas
router.use("/clientes", auth, cliente);
router.use("/usuarios", auth, usuario);
router.use("/contactos", auth, contacto);
router.use("/empleados", auth, empleado);
router.use("/empresas", auth, empresa);
router.use("/entidades", auth, entidad);
router.use("/horasFacturables", auth, horasFacturables);
router.use("/mantenimientos", auth, mantenimiento);
router.use("/productos", auth, producto);
router.use("/proveedores", auth, proveedor);
router.use("/proyectos", auth, proyecto);
router.use("/roles", auth, roles);
router.use("/solicitudes", auth, solicitud);
router.use("/tareasMantenimientos", auth, tareasManteniento);
router.use("/templates", auth, template);
router.use("/tipoProductos", auth, tipoProducto);

module.exports = router;
