const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Registration failed" });
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
      id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
    },
    token,
  });
};

module.exports = {
  register,
  login,
};
