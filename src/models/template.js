const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tareasMantenimiento_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TareaMantenimientos",
    },
  ],
});

const Template = mongoose.model("Templates", templateSchema);
module.exports = Template;
