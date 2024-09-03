const express = require("express");
const {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roles");
const router = express.Router();
const rolesValidacion = require("../validators/roles");

router.get("/", getAllRoles);

router.get("/:id", getRoleById);

router.post("/", rolesValidacion, createRole);

router.patch("/:id", updateRole);

router.delete("/:id", deleteRole);

module.exports = router;
