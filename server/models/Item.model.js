const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  coordinates: [Number], 
  // to work on leaflet, coordinates should always be an array of two numbers
  // [latitude, longitude]
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
