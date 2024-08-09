require("dotenv").config();
const Place = require("../models/Place");
const List = require("../models/List");

const getPlaces = async (req, res) => {
  const { userId, tripId } = req.query;
  if (!userId || !tripId) {
    return res
      .status(400)
      .json({ message: "User ID and Trip ID are required" });
  }

  try {
    // Find places associated with the userId and tripId and populate the list field
    const places = await Place.find({ userId, tripId }).populate("list");
    console.log(places);

    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    res.status(500).json({ message: "Server error while fetching places." });
  }
};

const createPlace = async (req, res) => {
  const { userId, tripId, ...placeData } = req.body;

  if (!userId || !tripId) {
    return res
      .status(400)
      .json({ message: "User ID and Trip ID are required" });
  }

  try {
    const newPlace = new Place({ userId, tripId, ...placeData });
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    console.error("Error creating place:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPlacesByDate = async (req, res) => {
  const { userId, tripId, date } = req.query;

  if (!userId || !tripId || !date) {
    return res
      .status(400)
      .json({ message: "User ID, Trip ID, and date are required" });
  }

  try {
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const places = await Place.find({
      userId,
      tripId,
      dateTime: {
        $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
        $lt: new Date(targetDate.setHours(23, 59, 59, 999)),
      },
    }).populate("list"); // Populate the list field with full list data

    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching places by date:", error.message);
    res
      .status(500)
      .json({ message: "Server error while fetching places by date." });
  }
};

const getSinglePlace = async (req, res) => {
  const { placeId } = req.params;
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json(place);
  } catch (error) {
    console.error("Error fetching place:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deletePlace = async (req, res) => {
  const { placeId } = req.params;
  try {
    const place = await Place.findByIdAndDelete(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting place:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePlace = async (req, res) => {
  const { placeId } = req.params;
  const { notes, list: listId, dateTime } = req.body;

  // Log request body
  console.log("Request body:", req.body);

  // Prepare update fields
  const updateFields = {};
  if (notes !== undefined) updateFields.notes = notes;
  if (listId !== undefined) updateFields.list = listId;

  // Handle empty dateTime properly
  if (dateTime === "") {
    updateFields.dateTime = null; // Or use undefined based on your schema
  } else if (dateTime !== undefined) {
    updateFields.dateTime = dateTime;
  }

  try {
    const place = await Place.findByIdAndUpdate(placeId, updateFields, {
      new: true,
    }).populate("list");

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res
      .status(200)
      .json({ data: place, message: "Place updated successfully" });
  } catch (error) {
    console.error("Error updating place:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPlaces,
  createPlace,
  getSinglePlace,
  deletePlace,
  updatePlace,
  getPlacesByDate,
};
