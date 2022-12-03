const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// routes middleware
// middleware de rotas
router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createNewCategory);
router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
