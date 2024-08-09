const express = require("express");
const router = express.Router();
const {
  getSingleList,
  createList,
  updateList,
  getUserLists,
  deleteList,
} = require("../controllers/listsController");

// Get user details
router.get("/", getUserLists, createList);
router.get("/:listId", getSingleList);
// Update user details
router.patch("/:listId", updateList);
router.delete("/:listId", deleteList);

module.exports = router;
