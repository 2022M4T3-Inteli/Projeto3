const mongoose = require("mongoose");

// CRIA UM SCHEMA PARA O BANCO DE DADOS
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
    trim: true,
  },
});

// CRIA UM MODEL PARA O BANCO DE DADOS
const Category = new mongoose.model("Category", categorySchema);
// EXPORTA O MODEL
module.exports = Category;
