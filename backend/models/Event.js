const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
  // place: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
  place: {
    type: {
      formatted_address: String,
      formatted_phone_number: String,
      geometry: {
        location: {
          lat: Number,
          lng: Number,
        },
        viewport: {
          northeast: {
            lat: Number,
            lng: Number,
          },
          southwest: {
            lat: Number,
            lng: Number,
          },
        },
      },
      name: String,
      opening_hours: {
        open_now: Boolean,
        periods: [
          {
            close: {
              day: Number,
              time: String,
            },
            open: {
              day: Number,
              time: String,
            },
          },
        ],
        weekday_text: [String],
      },
      photos: [
        {
          height: Number,
          html_attributions: [String],
          photo_reference: String,
          width: Number,
        },
      ],
      place_id: String,
      rating: Number,
      types: [String],
      utc_offset: Number,
      vicinity: String,
      website: String,
    },
  },
  dateTime: {
    type: Date,
  },
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Day",
  },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
});

module.exports = mongoose.model("Event", EventSchema);
