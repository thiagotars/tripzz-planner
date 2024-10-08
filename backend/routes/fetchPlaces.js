const express = require("express");
const router = express.Router();
const {
  getPlaces,
  getPlaceDetails,
  getPopularPlaces,
  getPopularRestaurants,
  getAutocompleteSuggestions,
} = require("../controllers/fetchPlacesController");

// Get budget details
router.get("/", getPlaces);
router.get("/details", getPlaceDetails);
router.get("/popular-places", getPopularPlaces);
router.get("/popular-restaurants", getPopularRestaurants);
router.get("/autocomplete", getAutocompleteSuggestions);

module.exports = router;
