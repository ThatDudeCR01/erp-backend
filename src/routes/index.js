const express = require("express");
const router = express.Router();

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

// //rutas publicas
// router.use("/login", login);

// router.use(verifyToken);

//rutas privadas

router.use("/entidades", entidad);
router.use("/usuarios", usuario);
router.use("/roles", roles);
router.use("/contactos", contacto);
router.use("/empleados", empleado); //nuevo
router.use("/proveedores", proveedor); //nuevo
router.use("/clientes", cliente); //nuevo?
router.use("/productos", producto); //nuevo
router.use("/tipoProductos", tipoProducto); //nuevo
router.use("/empresas", empresa); // en proceso
router.use("/proyectos", proyecto); // en proceso con empresa
// router.use("/horasFacturables", horasFacturables); 2
// router.use("/mantenimientos", mantenimiento); 3
// router.use("/solicitudes", solicitud); 4
// router.use("/tareasMantenimientos", tareasManteniento); 5
// router.use("/templates", template); 6

module.exports = router;
