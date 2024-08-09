const { StatusCodes } = require("http-status-codes");
const Trip = require("../models/Trip");
const Event = require("../models/Event");
const Day = require("../models/Day");
const List = require("../models/List");

const createEvent = async (req, res) => {
  const { place, dateTime, lists, dayId } = req.body;
  const { tripId } = req.params;

  try {
    // Find the trip by ID and populate its tripDays
    const trip = await Trip.findById(tripId).populate("tripDays");
    if (!trip) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Trip not found" });
    }

    // Find the specific day within the trip
    const day = trip.tripDays.find((d) => d._id.toString() === dayId);
    if (!day) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Day not found" });
    }

    // Create and save the new event
    const newEvent = new Event({ tripId, place, dateTime, lists, day: dayId });
    const savedEvent = await newEvent.save();

    // Update the day's events array with the new event ID
    day.events.push(savedEvent._id);
    await day.save();

    res.status(StatusCodes.CREATED).json({ event: savedEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create event" });
  }
};

const updateEvent = async (req, res) => {
  const { place, dateTime, lists } = req.body;
  const { eventId } = req.params;

  try {
    // Find and update the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Event not found" });
    }

    event.dateTime = dateTime || event.dateTime;
    event.place = place || event.place;

    if (lists) {
      // Update the event's lists
      const oldLists = await List.find({ events: eventId });
      const newLists = await List.find({ _id: { $in: lists } });

      // Remove event from old lists not in the new lists
      for (const oldList of oldLists) {
        if (!newLists.some((newList) => newList._id.equals(oldList._id))) {
          oldList.events = oldList.events.filter((e) => !e.equals(eventId));
          await oldList.save();
        }
      }

      // Add event to new lists
      for (const newList of newLists) {
        if (!oldLists.some((oldList) => oldList._id.equals(newList._id))) {
          newList.events.push(eventId);
          await newList.save();
        }
      }

      event.lists = lists;
    }

    // Save the updated event
    const updatedEvent = await event.save();
    res.status(StatusCodes.OK).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { tripId, eventId } = req.params;
  const { dayId } = req.body;
  console.log(dayId);

  try {
    // Find the day by ID and populate events if it's a reference
    const day = await Day.findById(dayId).populate("events");
    console.log(day);
    if (!day) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Day not found" });
    }

    // Pull the event by ID from day's events array
    day.events = day.events.filter((event) => event._id.toString() !== eventId);

    // Save the day after removing the event
    await day.save();

    // Also remove the event document from the database
    await Event.findByIdAndDelete(eventId);

    res.status(StatusCodes.OK).json(day);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const fetchEventsOfDay = async (req, res) => {
  const { tripId, dayId } = req.params;

  try {
    // Find the trip by ID and populate its tripDays
    const trip = await Trip.findById(tripId).populate({
      path: "tripDays",
      populate: {
        path: "events",
        model: "Event", // Assuming 'events' is populated with 'Event' documents
      },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Find the specific day within the trip
    const day = trip.tripDays.find((d) => d._id.toString() === dayId);
    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    res.status(200).json(day.events);
  } catch (error) {
    console.error("Error fetching events for day:", error.message);
    res.status(500).json({ message: "Failed to fetch events for day" });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  fetchEventsOfDay,
};

// const Day = require("../models/Day");
// const { StatusCodes } = require("http-status-codes");
// const Trip = require("../models/Trip");

// const createEvent = async (req, res) => {
//   const { place, date, time, inItinerary } = req.body;
//   const { tripId, dayId } = req.params;

//   try {
//     const trip = await Trip.findById(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     const day = trip.tripDays.id(dayId);
//     if (!day) {
//       return res.status(404).json({ message: "Day not found" });
//     }

//     const newEvent = {
//       date,
//       time,
//       place,
//       inItinerary,
//     };

//     day.events.push(newEvent);
//     await trip.save();

//     res.status(201).json(day);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateEvent = async (req, res) => {
//   const { place, date, time, inItinerary } = req.body;
//   const { tripId, dayId, eventId } = req.params;

//   try {
//     const trip = await Trip.findById(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     const day = trip.tripDays.id(dayId);
//     if (!day) {
//       return res.status(404).json({ message: "Day not found" });
//     }

//     const event = day.events.id(eventId);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     event.date = date || event.date;
//     event.time = time || event.time;
//     event.place = place || event.place;
//     event.inItinerary = inItinerary || event.inItinerary;

//     await trip.save();

//     res.status(200).json(day);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteEvent = async (req, res) => {
//   const { tripId, dayId, eventId } = req.params;

//   try {
//     const trip = await Trip.findById(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     const day = trip.tripDays.id(dayId);
//     if (!day) {
//       return res.status(404).json({ message: "Day not found" });
//     }

//     const event = day.events.id(eventId);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     event.remove();
//     await trip.save();

//     res.status(200).json(day);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getAllEvents = async (req, res) => {
//   const { tripId, dayId } = req.params;

//   try {
//     const trip = await Trip.findById(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     const day = trip.tripDays.id(dayId);
//     if (!day) {
//       return res.status(404).json({ message: "Day not found" });
//     }

//     res.status(200).json(day.events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getSingleEvent = async (req, res) => {
//   const { tripId, dayId, eventId } = req.params;

//   try {
//     const trip = await Trip.findById(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     const day = trip.tripDays.id(dayId);
//     if (!day) {
//       return res.status(404).json({ message: "Day not found" });
//     }

//     const event = day.events.id(eventId);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.status(200).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   getAllEvents,
//   getSingleEvent,
// };
