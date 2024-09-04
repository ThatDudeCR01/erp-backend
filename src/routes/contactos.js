const express = require("express");
const {
  createContacto,
  getAllContactos,
  getContactoById,
  deleteContacto,
  updateContacto,
} = require("../controllers/contacto");
const router = express.Router();
const { contacto, actualizarContacto } = require("../validators/contacto");

router.post("/", contacto, createContacto);

router.get("/", getAllContactos);

router.get("/:id", getContactoById);

router.put("/:id", actualizarContacto, updateContacto);

router.delete("/:id", deleteContacto);

module.exports = router;
