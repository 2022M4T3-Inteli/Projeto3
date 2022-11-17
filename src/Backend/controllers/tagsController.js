// MOCK DATA
let tagReading;
let isTagActivated;
////////////////////////////////////////////////////////////////////////////////////

// ROUTE HANDLERS
exports.tagUpdate = function (req, res) {
  if (!tagReading)
    tagReading = {
      macAddr: req.body.macAddr,
      hasMoved: req.body.hasMoved,
    };
  tagReading.positions = req.body.positions;
  !tagReading.hasMoved && (tagReading.hasMoved = req.body.hasMoved);

  if (!isTagActivated)
    isTagActivated = {
      macAddr: req.body.macAddr,
      activated: false,
    };

  console.log(tagReading);

  res.status(200).json(isTagActivated).end();
};

exports.getTagStatus = function (req, res) {
  res
    .status(200)
    .json({
      macAddr: tagReading.macAddr,
      hasMoved: tagReading.hasMoved,
    })
    .end();
};

exports.postTagStatus = function (req, res) {
  isTagActivated.activated = req.body.activated;
  !req.body.activated && (tagReading.hasMoved = false);

  console.log(isTagActivated);

  res.status(200).end();
};
