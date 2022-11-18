// MOCK DATA
let tagReading;
let isTagActivated;
////////////////////////////////////////////////////////////////////////////////////

// ROUTE HANDLERS
exports.tagUpdate = function (req, res) {
  if (!tagReading)
    tagReading = {
      macAddr: req.body.macAddress,
      isMoving: req.body.isMoving,
    };
  tagReading.positions = req.body.positions;
  tagReading.isMoving = req.body.isMoving;

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
      isMoving: tagReading.isMoving,
    })
    .end();
};

exports.postTagStatus = function (req, res) {
  isTagActivated.activated = req.body.activated;

  console.log(isTagActivated);

  res.status(200).json(req.body).end();
};
