const express = require("express");
const updateController = require("../controllers/updateController");

const router = express.Router();

// routes middleware
router.route("/").get(updateController.update);

module.exports = router;
