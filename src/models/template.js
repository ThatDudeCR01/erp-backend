const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tareasMantenimiento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TareaMantenimiento",
    required: true,
  },
});

const Template = mongoose.model("Template", templateSchema);
module.exports = Template;
