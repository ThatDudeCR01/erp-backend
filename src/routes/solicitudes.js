const express = require("express");
const solicitud = require("../controllers/solicitud");
const router = express.Router();
const { validationResult } = require("express-validator");
//const {solicitudValidacion} = require("../validators/solicitud");

router.get("/", solicitud.getAllSolicitudes);

// Ruta para crear una nueva solicitud, aplicando las validaciones
router.post("/", (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  solicitud.createSolicitud(req, res, next);
});

router.get("/:id", solicitud.getSolicitudById);

// Actualizar solicitud
router.put("/:id", (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  solicitud.updateSolicitud(req, res, next);
});

// Eliminar solicitud
router.delete("/:id", solicitud.deleteSolicitud);

module.exports = router;
