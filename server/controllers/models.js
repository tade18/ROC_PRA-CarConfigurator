const Model = require("../models/models");

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

exports.deleteModel = async (req, res) => {
  try {
    const result = await Model.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Model deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateModel = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      basePrice: req.body.basePrice,
      parameters: req.body.parameters,
    };
    const result = await Model.findByIdAndUpdate(req.params.id, data, {new:true});
    if (result) {
      return res.status(200).send({
        msg: "Model updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Model was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createModel = async (req, res) => {
  try {
    const data = new Model({
      name: req.body.name,
      basePrice: req.body.basePrice,
      parameters: req.body.parameters || [],
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Model created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Model was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};