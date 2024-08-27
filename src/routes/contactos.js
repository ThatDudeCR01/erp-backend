const express = require("express");
const contacto = require("../controllers/contacto");
const router = express.Router();
const { validationResult } = require("express-validator");
const contactoValidacion = require("../validators/contacto");

router.get("/", contacto.getAllContactos);

// Ruta para crear un nuevo contacto, aplicando las validaciones
router.post("/", contactoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  contacto.createcontacto(req, res, next);
});

router.get("/:id", contacto.getContactoById);

router.put("/:id", contactoValidacion, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  contacto.updatecontacto(req, res, next);
});
router.delete("/:id", contacto.deleteContacto);

module.exports = router;
