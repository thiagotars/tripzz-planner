const Trip = require("../models/Trip");
const Day = require("../models/Day");
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const List = require("../models/List");
const Event = require("../models/Event");
const Place = require("../models/Place");

const { StatusCodes } = require("http-status-codes");
const { InternalServerError, NotFoundError } = require("../errors");

const getAllTrips = async (req, res) => {
  console.log(req.user.userId);
  // console.log(req);
  try {
    const userId = req.user.userId;
    const currentDate = new Date();
    const allTrips = await Trip.find({
      $or: [{ createdBy: userId }, { invitedUsers: { $in: [userId] } }],
    }).sort("startDate");

    const upcomingTrips = allTrips.filter(
      (trip) => !trip.startDate || new Date(trip.startDate) > currentDate
    );
    const pastTrips = allTrips.filter(
      (trip) => trip.startDate && new Date(trip.endDate) < currentDate
    );
    const ongoingTrips = allTrips.filter(
      (trip) =>
        trip.startDate &&
        trip.endDate &&
        new Date(trip.startDate) <= currentDate &&
        new Date(trip.endDate) >= currentDate
    );

    res
      .status(StatusCodes.OK)
      .json({ allTrips, ongoingTrips, upcomingTrips, pastTrips });
  } catch (err) {
    if (err.name === "MyCustomDatabaseError") {
      console.error("Error fetching trips from database:", err);
      throw new InternalServerError("Internal server error (database)");
    } else {
      // Handle other types of errors
      console.error("Unexpected error:", err);
      throw new InternalServerError("Internal server error");
    }
  }
};

const getSingleTrip = async (req, res) => {
  // console.log(req.params);
  try {
    const tripId = req.params.tripId;
    // console.log(tripId);
    const trip = await Trip.findById(tripId);
    if (!trip) {
      throw new NotFoundError(`No trip found with id ${tripId}`);
    }
    res.status(StatusCodes.OK).json(trip);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Internal server error");
  }
};

const createTrip = async (req, res) => {
  try {
    const { createdBy, destination, startDate, endDate } = req.body;
    console.log(createdBy);

    if (!createdBy || !destination || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return res
        .status(400)
        .json({ error: "End date must be after start date." });
    }

    const newTrip = new Trip({
      createdBy,
      destination,
      startDate,
      endDate,
    });

    await newTrip.save();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const tripDays = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const day = new Day({
        date: new Date(d),
        tripId: newTrip._id,
        events: [],
      });
      tripDays.push(day);
    }

    // Save all day objects
    const savedDays = await Day.insertMany(tripDays);
    newTrip.tripDays = savedDays.map((day) => day._id);

    // Create the budget object
    const tripBudget = new Budget({
      tripId: newTrip._id,
      userId: newTrip.createdBy,
      maxBudget: 0,
      expenses: [],
    });

    await tripBudget.save();
    newTrip.budget.push(tripBudget._id);

    // Save the updated trip with the associated days and budget
    await newTrip.save();

    res
      .status(201)
      .json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const { destination, startDate, endDate, invitedUsers, budget, lists } =
      req.body;

    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      { destination, startDate, endDate, invitedUsers, budget, lists },
      { new: true }
    );
    if (!updatedTrip) {
      throw new NotFoundError(`No trip found with id ${tripId}`);
      // return res
      //   .status(StatusCodes.NOT_FOUND)
      //   .json({ message: "Trip not found" });
    }

    res.status(StatusCodes.OK).json(updatedTrip);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Internal server error");
  }
};

// const updateTrip = async (req, res) => {
//   const {
//     body: { destination, startDate, endDate },
//     user: { userId },
//     params: { id: tripId },
//   } = req;

//   if (!destination || !startDate || !endDate) {
//     throw new BadRequestError(
//       "Destination, start date and end date must be specified"
//     );
//   }

//   const trip = await Trip.findByIdAndUpdate(
//     { _id: tripId, createdBy: userId },
//     req.body,
//     { new: true, runValidators: true }
//   );

//   if (!trip) {
//     throw new NotFoundError(`No trip found with id ${tripId}`);
//   }
//   res.status(StatusCodes.OK).json({ trip });
// };

const deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    console.log(tripId);

    // Delete expenses associated with the trip
    await Expense.deleteMany({ tripId });

    // Delete budget associated with the trip
    await Budget.deleteMany({ tripId });

    // Delete days associated with the trip
    await Day.deleteMany({ tripId });

    // Delete lists associated with the trip
    await List.deleteMany({ tripId });

    // Delete events associated with the trip
    await Event.deleteMany({ tripId });

    // Delete places associated with the trip
    await Place.deleteMany({ tripId });

    const deletedTrip = await Trip.findByIdAndDelete(tripId);
    if (!deletedTrip) {
      throw new NotFoundError(`No trip found with id ${tripId}`);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Trip and associated resources deleted successfully" });
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Internal server error");
  }
};

module.exports = {
  getAllTrips,
  getSingleTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
