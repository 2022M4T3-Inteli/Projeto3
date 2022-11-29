const { CustomError, asyncHandler } = require("../utils/lib");
const Tag = require("./../models/tagModel");
////////////////////////////////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */
exports.getAllTags = asyncHandler(async function (req, res, next) {
  const _tags = await Tag.find();

  res
    .status(200)
    .json({
      status: "success",
      results: _tags.length,
      data: _tags,
    })
    .end();
});

exports.createNewTag = asyncHandler(async function (req, res, next) {
  const _tag = await Tag.create(req.body);
  res
    .status(201)
    .json({
      status: "success",
      data: _tag,
    })
    .end();
});

exports.getTag = asyncHandler(async function (req, res, next) {
  const _tag = await Tag.findById(req.params.id);

  if (!_tag) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { _tag },
    })
    .end();
});

exports.updateTag = asyncHandler(async function (req, res, next) {
  const _tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!_tag) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: { _tag },
    })
    .end();
});

exports.deleteTag = asyncHandler(async function (req, res, next) {
  const _tag = await Tag.findByIdAndDelete(req.params.id);

  if (!_tag) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: null,
    })
    .end();
});

exports.getStats = asyncHandler(async function (req, res, next) {
  const stats = await Tag.aggregate([
    {
      $group: {
        _id: "$category",
        results: { $sum: 1 },
      },
    },
    {
      $sort: { results: 1 },
    },
  ]);

  if (!stats) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { stats },
    })
    .end();
});
