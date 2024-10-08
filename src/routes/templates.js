const express = require("express");
const {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/template");
const router = express.Router();


const { templateValidacion } = require("../validators/template");

router.post("/", templateValidacion, createTemplate);

router.get("/", getAllTemplates);

router.get("/:id", getTemplateById);

router.patch("/:id", updateTemplate);


router.delete("/:id", deleteTemplate);

module.exports = router;
