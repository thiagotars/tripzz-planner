const express = require("express");
const router = express.Router();
const {
  fetchEventsOfDay,
  createEvent,
  updateEvent,
  // getSingleEvent,
  deleteEvent,
} = require("../controllers/daysController");

router.get("/:dayId", fetchEventsOfDay);
router.post("/", createEvent);
// router.get("/:eventId", getSingleEvent);
// Update user details
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
