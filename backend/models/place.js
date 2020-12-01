const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    imageUrl: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
  },
  address: { type: String },
  location: {
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    zoom: { type: Number }
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Place", placeSchema);
