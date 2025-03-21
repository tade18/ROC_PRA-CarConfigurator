const Model = require("../models/models");

//controller pro vytvoření modelu
exports.createModel = async (req, res) => {
  try {
    
    const data = new Model({
      name: req.body.name,
      basePrice: req.body.basePrice,
      bodyType: req.body.bodyType,
      colors: req.body.colors || [],
      engines: req.body.engines || [],
      extras: req.body.extras || []
    });

    const result = await data.save();
    if (result) return res.status(201).send({msg: "Model successfully created", payload: result})
    res.status(500).send({
      msg: "Model was not successfully created"
  })
  } catch (error) {
    res.status(500).send(error);
  }
};

//controller pro zobrazení všech modelů
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

//získání jednoho konkrétního modelu
exports.getModelById = async (req, res) => {
  try {
    const result = await Model.findById(req.params.id);
    if (result) {
      return res.status(200).send({msg: "Model found",payload: result});
    res.status(404).send({ msg: "Model not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//controller pro upravení modelu
exports.updateModel = async (req, res) => {
  try {
    const data = new Model({
      name: req.body.name,
      basePrice: req.body.basePrice,
      bodyType: req.body.bodyType,
      colors: req.body.colors || [],
      engines: req.body.engines || [],
      extras: req.body.extras || []
    });
    const result = await Model.findByIdAndUpdate(req.params.id, data);
    if (result) res.status(200).send({msg:"Model successfully updated", payload: result})
    res.status(500).send({msg:"Model was not updated"})
  } catch (error) {
    res.status(500).send(error);
  }
};

//controller pro odstranění modelu
exports.deleteModel = async (req, res) => {
  try {
    const deletedModel = await Model.findByIdAndDelete(req.params.id);
    if (result) return res.status(200).send({msg:"Model successfully deleted"})
    res.status(500).send({msg:"Model was not deleted. Something went wrong!"})
  } catch (error) {
    res.status(500).send(error);
  }
};
