const express = require("express");
const tagsController = require("../controllers/tagsController");

const router = express.Router();

// routes middleware
router.route("/").get(tagsController.getAllTags);
router.route("/:id").get(tagsController.getTag);

module.exports = router;
