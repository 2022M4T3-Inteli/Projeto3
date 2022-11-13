const fs = require("fs");

// DATA LOAD
const tags = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/tags.json`, {
    encoding: "utf-8",
  })
);
////////////////////////////////////////////////////////////////////////

// ROUTE HANDLERS
exports.getAllTags = function (req, res) {
  res
    .status(200)
    .json({
      status: "success",
      data: { tags },
    })
    .end();
};

exports.getTag = function (req, res) {
  res
    .status(200)
    .json({
      status: "success",
      data: { tag: tags.find((el) => String(el.macAddress) === req.params.id) },
    })
    .end();
};
