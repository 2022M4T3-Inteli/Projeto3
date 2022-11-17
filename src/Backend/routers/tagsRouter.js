const express = require("express");
const tagsController = require("./../controllers/tagsController");

const router = express.Router();

// routes middleware
router.route("/tagUpdate").post(tagsController.tagUpdate);
router
  .route("/tagStatus")
  .get(tagsController.getTagStatus)
  .post(tagsController.postTagStatus);

module.exports = router;
