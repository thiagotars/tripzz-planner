const express = require("express");
const router = express.Router();
const {
  getAllDays,
  createDay,
  updateDays,
  getSingleDay,
} = require("../controllers/daysController");

// Get user details
router.get("/", getAllDays);
router.post("/", createDay);
router.get("/:dayId", getSingleDay);
// Update user details
router.patch("/:dayId", updateDays);

module.exports = router;
