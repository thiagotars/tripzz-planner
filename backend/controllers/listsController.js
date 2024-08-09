const List = require("../models/List");
const Trip = require("../models/Trip");

const { StatusCodes } = require("http-status-codes");

const getAllLists = async (req, res) => {
  try {
    const { tripId } = req.params;
    const lists = await List.find({ tripId });
    res.status(StatusCodes.OK).json(lists);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getSingleList = async (req, res) => {
  try {
    const { listId } = req.params;

    // Find the list by its ID
    const list = await List.findById(listId);

    // Check if the list exists
    if (!list) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "List not found" });
    }

    // Return the list data
    res.status(StatusCodes.OK).json(list);
  } catch (error) {
    console.error("Error fetching the list:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const createList = async (req, res) => {
  const { tripId } = req.params;
  const { name, userId } = req.body;

  // Ensure userId is provided
  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "userId is required" });
  }
  try {
    // Create a new list document
    const newList = new List({
      tripId,
      name,
      userId,
    });

    // Save the new list to the database
    await newList.save();

    // Update the corresponding trip document to include the newly created list
    await Trip.findByIdAndUpdate(tripId, { $push: { lists: newList } });

    // Respond with success message and the created list
    res
      .status(StatusCodes.CREATED)
      .json({ message: "List created successfully", list: newList });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteList = async (req, res) => {
  try {
    const { listId } = req.params;

    // Delete the list document from the List collection
    await List.findByIdAndDelete(listId);

    res.status(StatusCodes.OK).json({ message: "List deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name, places, events, inItinerary } = req.body;

    // Find the list by its ID
    let list = await List.findById(listId);

    // Check if the list exists
    if (!list) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "List not found" });
    }

    // Update the list properties
    list.name = name || list.name; // Update name if provided, otherwise keep the existing value
    list.places = places || list.places; // Update places if provided, otherwise keep the existing value
    list.events = events || list.events;
    list.inItinerary = inItinerary || list.inItinerary;

    // Save the updated list
    list = await list.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "List updated successfully", list });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllLists,
  createList,
  deleteList,
  updateList,
  getSingleList,
};
