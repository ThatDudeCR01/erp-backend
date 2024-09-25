const express = require("express");
const {
  createSolicitud,
  getAllSolicitudes,
  getSolicitudById,
  updateSolicitud,
  deleteSolicitud,
} = require("../controllers/solicitud");
const router = express.Router();
const { validationResult } = require("express-validator");

router.get("/", getAllSolicitudes);

router.post("/", createSolicitud);

router.get("/:id", getSolicitudById);

router.patch("/:id", updateSolicitud);

router.delete("/:id", deleteSolicitud);

module.exports = router;
