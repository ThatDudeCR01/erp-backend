const express = require("express");
const {
  createContacto,
  getAllContactos,
  getContactoById,
  deleteContacto,
  updateContacto,
} = require("../controllers/contacto");
const router = express.Router();
const {
  contactoValidacion,
  actualizarContactoValidacion,
  validarContactoId,
} = require("../validators/contacto");

router.get("/", getAllContactos);

router.get("/:id", getContactoById);

router.post("/", contactoValidacion, createContacto);

router.patch("/:id", actualizarContactoValidacion, updateContacto);

router.delete("/:id", validarContactoId, deleteContacto);

module.exports = router;
