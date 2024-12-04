const express = require("express");
const {
  createHorasFacturables,
  getAllHorasFacturables,
  getHorasFacturablesById,
  updateHorasFacturables,
  deleteHorasFacturables,
} = require("../controllers/horas-facturable");
const router = express.Router();
const {
  horasFacturablesValidacion,
} = require("../validators/horasFacturables");

router.post("/", horasFacturablesValidacion, createHorasFacturables);

router.get("/", getAllHorasFacturables);

router.get("/:id", getHorasFacturablesById);

router.patch("/:id", updateHorasFacturables);

router.delete("/:id", deleteHorasFacturables);

module.exports = router;
