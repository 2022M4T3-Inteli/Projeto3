const express = require("express");
const updateController = require("../controllers/updateController");

const router = express.Router();

// routes middleware
router
  .route("/")
  .get(updateController.update)
  .post(updateController.postRequest);

module.exports = router;
