const axios = require("axios");
require("dotenv").config();

const getPlaces = async (req, res) => {
  const { query, city } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: `${query} in ${city}`,
          key: apiKey,
          language: "en",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
};

const getPlaceDetails = async (req, res) => {
  const { placeId } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          fields:
            "place_id,name,formatted_address,website,rating,formatted_phone_number,opening_hours,price_level,photo,types,vicinity,utc_offset,geometry",
          key: apiKey,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    res.status(500).json({ error: "Failed to fetch place details" });
  }
};

const getPopularPlaces = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=popular+places+in+${city}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    let places = response.data.results;

    // Filter to include only places with a rating
    places = places.filter((place) => place.rating);

    // Sort places by rating in descending order
    places.sort((a, b) => b.rating - a.rating);

    // Limit to 6 places
    const limitedPlaces = places.slice(0, 6);

    res.json({ results: limitedPlaces });
  } catch (error) {
    console.error("Error fetching popular places:", error);
    res.status(500).json({ error: "Failed to fetch places" });
  }
};

const getPopularRestaurants = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${city}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const places = response.data.results;

    const filteredPlaces = places
      .filter(
        (place) =>
          place.types.includes("restaurant") &&
          place.rating &&
          place.user_ratings_total &&
          place.price_level
      )
      .map((place) => {
        // Calculate popularity score (you can adjust the formula as needed)
        const popularityScore =
          place.rating * Math.log10(place.user_ratings_total + 1);
        return { ...place, popularityScore };
      })
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 6);

    res.json({ results: filteredPlaces });
  } catch (error) {
    console.error("Error fetching popular restaurants:", error);
    res.status(500).json({ error: "Failed to fetch places" });
  }
};

module.exports = {
  getPlaces,
  getPlaceDetails,
  getPopularPlaces,
  getPopularRestaurants,
};
