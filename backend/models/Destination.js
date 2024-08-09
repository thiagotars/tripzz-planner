const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  city: { type: String },
  country: { type: String },
  capital: { type: String },
  population: { type: Number },
  language: { type: String },
  flag: { type: String },
  currency: [
    {
      code: { type: String, required: true },
      name: { type: String, required: true },
      symbol: { type: String, required: true },
    },
  ],
  image: String,
  photos: [
    {
      height: { type: Number },
      html_attributions: [{ type: String }],
      photo_reference: { type: String },
      width: { type: Number },
    },
  ],
  vicinity: { type: String },
  utc_offset: { type: Number },
  geometry: {
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    viewport: {
      northeast: {
        lat: { type: Number },
        lng: { type: Number },
      },
      southwest: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
  },
  place_id: { type: String },
  continents: [{ type: String }],
  capital: [{ type: String }],
  timezones: [{ type: String }],
});

module.exports = destinationSchema;
