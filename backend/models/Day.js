const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("Day", DaySchema);
