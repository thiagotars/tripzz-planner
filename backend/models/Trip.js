const mongoose = require("mongoose");
const destinationSchema = require("./Destination");
const ListSchema = require("../models/List"); // Adjust the path as necessary

const TripSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    destination: {
      type: destinationSchema,
      required: [true, "Please provide a valid destination city"],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide a valid start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please provide a valid end date"],
    },
    invitedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    budget: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    tripDays: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Day",
      },
    ],
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);
