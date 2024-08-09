const express = require("express");
const router = express.Router();
const {
  getPlaces,
  getSinglePlace,
  deletePlace,
  createPlace,
  updatePlace,
  getPlacesByDate,
} = require("../controllers/placesController");

// Get budget details
router.get("/", getPlaces);
router.get("/byDate", getPlacesByDate);
router.get("/:placeId", getSinglePlace);
router.patch("/:placeId", updatePlace);
router.delete("/:placeId", deletePlace);
router.post("/", createPlace);

module.exports = router;
