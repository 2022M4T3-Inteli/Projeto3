const mongoose = require("mongoose");
// CRIA UM SCHEMA PARA O BANCO DE DADOS
const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "category is required"],
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// CRIA UM MODEL PARA O BANCO DE DADOS
const Tag = new mongoose.model("Tag", tagSchema);
// EXPORTA O MODEL
module.exports = Tag;
