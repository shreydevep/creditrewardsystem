const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  price: Number,
  description: String,
  productName: String,
  numberOfEmis: Number,
  image: String
});

module.exports = mongoose.model('Product', ProductSchema);
