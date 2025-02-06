const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: Map, of: String }
});

const ParameterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [OptionSchema]
});

const ModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  parameters: [ParameterSchema]
});

module.exports = mongoose.model("Model", ModelSchema);
