const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

const auth = require("./auth");
const cliente = require("./clientes");
const factura = require("./facturas");
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
const tipoEmpleado = require("./tipoEmpleados");

router.use("/auth", auth);

router.use(verifyToken);

router.use("/entidades", entidad);
router.use("/usuarios", usuario);
router.use("/facturas", factura);
router.use("/roles", roles);
router.use("/contactos", contacto);
router.use("/empleados", empleado);
router.use("/proveedores", proveedor);
router.use("/clientes", cliente);
router.use("/productos", producto);
router.use("/tipoProductos", tipoProducto);
router.use("/tipoEmpleados", tipoEmpleado);
router.use("/empresas", empresa);
router.use("/proyectos", proyecto);
router.use("/horasFacturables", horasFacturables);
router.use("/mantenimientos", mantenimiento);
router.use("/solicitudes", solicitud);
router.use("/tareasMantenimientos", tareasManteniento);
router.use("/templates", template);

module.exports = router;
