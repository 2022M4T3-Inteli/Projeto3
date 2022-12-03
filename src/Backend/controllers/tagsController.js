const Tag = require("./../models/tagModel");
////////////////////////////////////////////////////////////////////////////////////

// ROUTE HANDLERS
// MANIPULA AS ROTAS
exports.getAllTags = async function (req, res) {
  try {
    const _tags = await Tag.find();

    res
      .status(200)
      .json({
        status: "success",
        results: _tags.length,
        data: _tags,
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

exports.createNewTag = async function (req, res) {
  try {
    const _tag = await Tag.create(req.body);
    res
      .status(201)
      .json({
        status: "success",
        data: _tag,
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

exports.getTag = async function (req, res) {
  try {
    const _tag = await Tag.findById(req.params.id);
    res
      .status(200)
      .json({
        status: "success",
        data: { _tag },
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

exports.updateTag = async function (req, res) {
  try {
    const _tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({
        status: "sucess",
        data: { _tag },
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

exports.deleteTag = async function (req, res) {
  try {
    await Tag.findByIdAndDelete(req.params.id);
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

exports.getStats = async function (req, res) {
  try {
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

    res
      .status(200)
      .json({
        status: "success",
        data: { stats },
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
