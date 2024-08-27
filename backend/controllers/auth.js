const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const axios = require("axios");
require("dotenv").config();

const mockGeolocationResponse = require("../mockGeolocationData");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate name
    if (!name || name.trim() === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Name is required" });
    }

    // Validate email
    if (!email || email.trim() === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid email format" });
    }

    // Validate password
    if (!password || password.length < 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Password must be at least 6 characters long",
      });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Email is already in use. Please choose a different email",
      });
    }

    // Get the user's IP address
    const userIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let userCountryCode;

    if (process.env.NODE_ENV === "development") {
      // Use mock geolocation data in development
      userCountryCode = mockGeolocationResponse.country_code2;
    } else {
      // Get the user's country based on the IP address
      const geoResponse = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_KEY}&ip=${userIp}`
      );
      userCountryCode = geoResponse.data.country_code2;
    }

    // Step 2: Get the currency data for the user's country
    const currencyResponse = await axios.get(
      `https://restcountries.com/v3.1/alpha/${userCountryCode}`
    );
    const currencyData = currencyResponse.data[0].currencies;
    const currencyCode = Object.keys(currencyData)[0];
    const currency = {
      name: currencyData[currencyCode].name,
      symbol: currencyData[currencyCode].symbol,
      code: currencyCode,
    };

    // Step 3: Create the user with the fetched currency data
    const user = await User.create({
      ...req.body,
      currency,
    });
    const token = user.createJWT();

    // Step 4: Send the response back to the client
    res.status(StatusCodes.CREATED).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        currency: user.currency,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: messages.join(". ") });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Registration failed. Please try again later." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnauthenticatedError("Please provide email and password");
  }

  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordCorrect = await userDoc.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid credentials");
  }

  const token = userDoc.createJWT();
  // console.log(token);

  res.status(StatusCodes.OK).json({
    user: {
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
      currency: userDoc.currency,
    },
    token,
  });
};

module.exports = {
  register,
  login,
};
