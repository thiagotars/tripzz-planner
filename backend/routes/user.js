const express = require("express");
const router = express.Router();
const {
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userController");

// Get user details
router.get("/:userId", getUserDetails);

// Update user details
router.put("/:userId", updateUserDetails);

module.exports = router;
