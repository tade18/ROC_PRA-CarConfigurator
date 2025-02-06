var express = require("express");
var router = express.Router();

const modelsController = require("../controllers/models");

router.get("/", modelsController.getAllModels);

//localhost:3000/cats/5sa4d949qw86d5sa4d6sa
//req.params.id

router.get("/:id", modelsController.getModelById);

router.delete("/:id", modelsController.deleteModel);

router.put("/:id", modelsController.updateModel);

router.post("/", modelsController.createModel);

module.exports = router;