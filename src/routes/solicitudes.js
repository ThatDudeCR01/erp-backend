const express = require("express");

const {
  createSolicitud,
  getAllSolicitudes,
  getSolicitudById,
  deleteSolicitud,
  updateSolicitud,
} = require("../controllers/solicitud");

const {
  solicitudValidacion,
  actualizarSolicitudValidacion,
  validarSolicitudId,
} = require("../validators/solicitud");

const router = express.Router();

router.post("/", solicitudValidacion, createSolicitud);

router.get("/", getAllSolicitudes);

router.get("/:id", getSolicitudById);

router.patch("/:id", actualizarSolicitudValidacion, updateSolicitud);

router.delete("/:id", validarSolicitudId, deleteSolicitud);

module.exports = router;
