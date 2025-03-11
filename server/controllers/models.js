const Model = require("../models/models");

exports.createModel = async (req, res) => {
  try {
    const { name, basePrice, bodyType, colors, engines, extras } = req.body;

    if (!name || !basePrice || !bodyType || !colors || !engines) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newModel = new Model({
      name: req.body.name,
      basePrice: req.body.basePrice,
      bodyType: req.body.bodyType,
      colors: req.body.colors || [],
      engines: req.body.engines || [],
      extras: req.body.extras || []
    });

    await newModel.save();
    res.status(201).json(newModel);
  } catch (error) {
    res.status(500).json({ message: "Error creating car model", error: error.message });
  }
};

exports.getAllModels = async (req, res) => {
  try {
    const result = await Model.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Models found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Models not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getModelById = async (req, res) => {
  try {
    const result = await Model.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Model found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Model not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateModel = async (req, res) => {
  try {
    const updatedModel = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedModel) return res.status(404).json({ message: "Model not found" });

    res.status(200).json(updatedModel);
  } catch (error) {
    res.status(500).json({ message: "Error updating car model", error: error.message });
  }
};

exports.deleteModel = async (req, res) => {
  try {
    const deletedModel = await Model.findByIdAndDelete(req.params.id);
    if (!deletedModel) return res.status(404).json({ message: "Model not found" });

    res.status(200).json({ message: "Model deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car model", error: error.message });
  }
};
