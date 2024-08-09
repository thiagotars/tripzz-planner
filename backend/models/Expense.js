const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expense",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount"],
  },
  description: {
    type: String,
  },
  type: {
    type: {
      type: String,
      enum: ["Food", "Activities", "Shopping", "Transport", "Hotel", "Other"],
      default: "Other",
    },
    icon: { type: String, default: "" },
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
