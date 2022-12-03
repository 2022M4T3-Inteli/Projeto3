const Category = require("../models/categoryModel");
////////////////////////////////////////////////////////////////////////////////////

// ROUTE HANDLERS
// MANIPULA AS ROTAS
exports.getAllCategories = async function (req, res) {
  try {
    const _categories = await Category.find();

    res
      .status(200)
      .json({
        status: "success",
        results: _categories.length,
        data: _categories,
      })
      .end();
  } catch (err) {
    res
      .status(400)
      .json({
        status: "fail",
        message: err,
      })
      .end();
  }
};

exports.createNewCategory = async function (req, res) {
  try {
    const _category = await Category.create(req.body);
    res
      .status(201)
      .json({
        status: "success",
        data: _category,
      })
      .end();
  } catch (err) {
    res
      .status(400)
      .json({
        status: "fail",
        message: err,
      })
      .end();
  }
};

exports.getCategory = async function (req, res) {
  try {
    const _category = await Category.findById(req.params.id);
    res
      .status(200)
      .json({
        status: "success",
        data: { _category },
      })
      .end();
  } catch (err) {
    res
      .status(400)
      .json({
        status: "fail",
        message: err,
      })
      .end();
  }
};

exports.updateCategory = async function (req, res) {
  try {
    const _category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json({
        status: "sucess",
        data: { _category },
      })
      .end();
  } catch (err) {
    res
      .status(400)
      .json({
        status: "fail",
        message: err,
      })
      .end();
  }
};

exports.deleteCategory = async function (req, res) {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({
        status: "sucess",
        data: null,
      })
      .end();
  } catch (err) {
    res
      .status(400)
      .json({
        status: "fail",
        message: err,
      })
      .end();
  }
};
