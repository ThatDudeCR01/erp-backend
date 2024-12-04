const Factura = require("../models/factura");
const Producto = require("../models/producto");
const Proyecto = require("../models/proyecto");
const Cliente = require("../models/cliente");
const Empresa = require("../models/empresa");

const crearFactura = async (req, res) => {
  try {
    const {
      referenciaId,
      referenciaModelo,
      tipo_factura,
      cantidad,
      productos,
      proyecto_id,
    } = req.body;

    if (!["Cliente", "Empresa"].includes(referenciaModelo)) {
      return res
        .status(400)
        .json({ error: "El modelo de referencia debe ser Cliente o Empresa" });
    }

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        error:
          "El campo 'productos' debe ser un array con al menos un elemento.",
      });
    }

    const referenciaExiste =
      referenciaModelo === "Cliente"
        ? await Cliente.findById(referenciaId)
        : await Empresa.findById(referenciaId);

    if (!referenciaExiste) {
      return res.status(404).json({
        error: `No se encontró el ${referenciaModelo.toLowerCase()} con ese ID`,
      });
    }

    let totalFactura = 0;
    const detallesProductos = [];

    for (const item of productos) {
      const { producto_id, cantidad } = item;

      const productoDetalle = await Producto.findById(producto_id);
      if (!productoDetalle) {
        return res
          .status(404)
          .json({ error: `El producto con ID ${producto_id} no se encontró` });
      }

      const totalProducto = productoDetalle.precio * cantidad;
      totalFactura += totalProducto;

      detallesProductos.push({
        nombre: productoDetalle.nombre,
        precio: productoDetalle.precio,
        cantidad,
        total_producto: totalProducto,
        producto_id: productoDetalle._id.toString(),
      });
    }

    const proyectoDetalle = await Proyecto.findById(proyecto_id);
    if (!proyectoDetalle) {
      return res.status(404).json({ error: "El proyecto no se encontró" });
    }

    const proyectoCopia = {
      nombre: proyectoDetalle.nombre,
      descripcion: proyectoDetalle.descripcion,
      proyecto_id: proyectoDetalle._id.toString(),
    };

    const nuevaFactura = new Factura({
      referencia: referenciaId,
      referenciaModelo,
      tipo_factura,
      cantidad,
      linea_detalle_producto: detallesProductos,
      linea_detalle_proyecto: proyectoCopia,
    });

    await nuevaFactura.save();

    res
      .status(201)
      .json({ mensaje: "Factura creada exitosamente", factura: nuevaFactura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la factura" });
  }
};

const getAllFacturas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    const filterRegex = new RegExp(filter, "i");

    const searchCriteria = {
      $or: [
        { tipo_factura: { $regex: filterRegex } },
        { "linea_detalle_producto.nombre": { $regex: filterRegex } },
        { "linea_detalle_proyecto.nombre": { $regex: filterRegex } },
        { "linea_detalle_proyecto.descripcion": { $regex: filterRegex } },
      ],
    };

    const facturas = await Factura.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalFacturas = await Factura.countDocuments(searchCriteria).exec();

    res.send({
      page,
      limit,
      totalPages: Math.ceil(totalFacturas / limit),
      totalFacturas,
      facturas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar facturas",
      errorMessage: error.message,
    });
  }
};

const getFacturaById = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findById(id);

    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    res.status(200).json({ factura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la factura" });
  }
};

const updateFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      referenciaId,
      referenciaModelo,
      tipo_factura,
      cantidad,
      productos,
      proyecto_id,
    } = req.body;

    const facturaExistente = await Factura.findById(id);
    if (!facturaExistente) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    let totalFactura = 0;
    const detallesProductos = [];

    for (const item of productos) {
      const { producto_id, cantidad } = item;

      const productoDetalle = await Producto.findById(producto_id);
      if (!productoDetalle) {
        return res
          .status(404)
          .json({ error: `El producto con ID ${producto_id} no se encontró` });
      }

      const totalProducto = productoDetalle.precio * cantidad;
      totalFactura += totalProducto;

      detallesProductos.push({
        nombre: productoDetalle.nombre,
        precio: productoDetalle.precio,
        cantidad,
        total_producto: totalProducto,
        producto_id: productoDetalle._id.toString(),
      });
    }

    const proyectoDetalle = await Proyecto.findById(proyecto_id);
    if (!proyectoDetalle) {
      return res.status(404).json({ error: "El proyecto no se encontró" });
    }

    const proyectoCopia = {
      nombre: proyectoDetalle.nombre,
      descripcion: proyectoDetalle.descripcion,
      proyecto_id: proyectoDetalle._id.toString(),
    };

    facturaExistente.referencia = referenciaId;
    facturaExistente.referenciaModelo = referenciaModelo;
    facturaExistente.tipo_factura = tipo_factura;
    facturaExistente.cantidad = cantidad;
    facturaExistente.linea_detalle_producto = detallesProductos;
    facturaExistente.linea_detalle_proyecto = proyectoCopia;

    await facturaExistente.save();

    res.status(200).json({
      mensaje: "Factura actualizada exitosamente",
      factura: facturaExistente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la factura" });
  }
};

const deleteFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findByIdAndDelete(id);

    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    res.status(200).json({ mensaje: "Factura eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la factura" });
  }
};

module.exports = {
  crearFactura,
  getAllFacturas,
  getFacturaById,
  updateFactura,
  deleteFactura,
};
