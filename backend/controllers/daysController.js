const Day = require("../models/Day");
const { StatusCodes } = require("http-status-codes");
const Trip = require("../models/Trip");

// Create a new day
const createDay = async (req, res) => {
  try {
    const { tripId, date } = req.body;
    const newDay = new Day({ date, tripId, events: [] });
    await newDay.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Day created successfully", day: newDay });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create day" });
  }
};

const getAllDays = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Trip not found" });
    }

    const days = await Day.find({ tripId });
    res.status(StatusCodes.OK).json(days);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getSingleDay = async (req, res) => {
  try {
    const { dayId } = req.params;
    const day = await Day.findById(dayId);
    if (!day) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Day not found" });
    }
    res.status(StatusCodes.OK).json(days);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const updateDay = async (req, res) => {
  try {
    const { dayId } = req.params;
    const { places, events } = req.body; // Assuming these are the fields you want to update

    // Find the day by ID
    const day = await Day.findById(dayId);
    if (!day) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Day not found" });
    }
    console.log(events);
    day.places = places;
    day.events = events;

    await day.save();

    res.status(StatusCodes.OK).json({ message: "Day updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to update day" });
  }
};

module.exports = { createDay, getAllDays, getSingleDay, updateDay };
