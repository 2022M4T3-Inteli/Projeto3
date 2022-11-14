exports.update = function (req, res) {
  console.log(req);

  res.status(200).end();
};

exports.postRequest = function (req, res) {
  console.log(req.body);

  res.status(200).end();
};
