const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  dateTime: { type: Date },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  notes: { type: String },
  name: { type: String, required: true },
  formatted_address: { type: String },
  website: { type: String },
  rating: { type: Number },
  formatted_phone_number: { type: String },
  opening_hours: {
    open_now: { type: Boolean },
    periods: [
      {
        close: {
          day: { type: Number },
          time: { type: String },
        },
        open: {
          day: { type: Number },
          time: { type: String },
        },
      },
    ],
    weekday_text: [{ type: String }],
  },
  price_level: { type: Number },
  photos: [
    {
      height: { type: Number },
      html_attributions: [{ type: String }],
      photo_reference: { type: String },
      width: { type: Number },
    },
  ],
  types: [{ type: String }],
  vicinity: { type: String },
  utc_offset: { type: Number },
  business_status: { type: String },
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
  icon: { type: String },
  icon_background_color: { type: String },
  icon_mask_base_uri: { type: String },
  place_id: { type: String, required: true },
  plus_code: {
    compound_code: { type: String },
    global_code: { type: String },
  },
  reference: { type: String },
  user_ratings_total: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
});

const Place = mongoose.model("Place", PlaceSchema);
module.exports = Place;

// const placeSchema = new mongoose.Schema({
//   name: { type: String },
//   formatted_address: { type: String },
//   website: { type: String },
//   rating: { type: Number },
//   formatted_phone_number: { type: String },
//   opening_hours: {
//     open_now: { type: Boolean },
//     periods: [
//       {
//         close: {
//           day: { type: Number },
//           time: { type: String },
//         },
//         open: {
//           day: { type: Number },
//           time: { type: String },
//         },
//       },
//     ],
//     weekday_text: [{ type: String }],
//   },

//   price_level: { type: Number },
//   photos: [
//     {
//       height: { type: Number },
//       html_attributions: [{ type: String }],
//       photo_reference: { type: String },
//       width: { type: Number },
//     },
//   ],
//   types: [{ type: String }],
//   vicinity: { type: String },
//   utc_offset: { type: Number },
//   business_status: { type: String },
//   geometry: {
//     location: {
//       lat: { type: Number },
//       lng: { type: Number },
//     },
//     viewport: {
//       northeast: {
//         lat: { type: Number },
//         lng: { type: Number },
//       },
//       southwest: {
//         lat: { type: Number },
//         lng: { type: Number },
//       },
//     },
//   },
//   icon: { type: String },
//   icon_background_color: { type: String },
//   icon_mask_base_uri: { type: String },
//   place_id: { type: String },
//   plus_code: {
//     compound_code: { type: String },
//     global_code: { type: String },
//   },
//   reference: { type: String },
//   user_ratings_total: { type: Number },
// });

// module.exports = placeSchema;
