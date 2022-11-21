const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
    trim: true,
  },
  macAddress: {
    type: String,
    required: [true, "macAddress is required"],
    unique: true,
  },
  lastPosition: {
    type: Array,
    default: [0, 0, 0],
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tag = new mongoose.model("Tag", tagSchema);

module.exports = Tag;
