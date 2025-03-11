const mongoose = require("mongoose");

const RimSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rims: { type: [RimSchema], required: true }
});

const EngineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  power: { type: Number, required: true },
  price: { type: Number, required: true },
  emissions: { type: Number, required: true },
  image: { type: String, required: true }
});

const ExtraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const ModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  bodyType: { type: String, required: true },
  colors: { type: [ColorSchema], required: true },
  engines: { type: [EngineSchema], required: true },
  extras: { type: [ExtraSchema], required: true }
});

module.exports = mongoose.model("Model", ModelSchema);