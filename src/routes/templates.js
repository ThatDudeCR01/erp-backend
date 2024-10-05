const express = require("express");
const {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/template");
const router = express.Router();
const templateValidacion = require("../validators/template");

router.get("/", getAllTemplates);

router.post("/", templateValidacion, createTemplate);

router.get("/:id", getTemplateById);

router.put("/:id", templateValidacion, updateTemplate);

router.delete("/:id", deleteTemplate);

module.exports = router;
