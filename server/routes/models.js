var express = require("express");
var router = express.Router();

const modelsController = require("../controllers/models");

router.get("/", modelsController.getAllModels);

router.get("/:id", modelsController.getModelById);

router.delete("/:id", modelsController.deleteModel);

router.put("/:id", modelsController.updateModel);

router.post("/", modelsController.createModel);

module.exports = router;