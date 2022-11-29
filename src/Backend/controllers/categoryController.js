const { CustomError, asyncHandler } = require("../utils/lib");
const Category = require("../models/categoryModel");
////////////////////////////////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */
exports.getAllCategories = asyncHandler(async function (req, res) {
  const _categories = await Category.find();

  res
    .status(200)
    .json({
      status: "success",
      results: _categories.length,
      data: _categories,
    })
    .end();
});

exports.createNewCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.create(req.body);
  res
    .status(201)
    .json({
      status: "success",
      data: _category,
    })
    .end();
});

exports.getCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.findById(req.params.id);

  if (!_category) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { _category },
    })
    .end();
});

exports.updateCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!_category) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: { _category },
    })
    .end();
});

exports.deleteCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.findByIdAndDelete(req.params.id);

  if (!_category) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: null,
    })
    .end();
});
