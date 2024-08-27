// const mongoose = require("mongoose");

// const ListSchema = new mongoose.Schema({
//   tripId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Trip",
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// module.exports = ListSchema;

const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // events: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Event",
  //   },
  // ],
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
});

module.exports = mongoose.model("List", ListSchema);
