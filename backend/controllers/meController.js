const User = require("../models/User");
const StatusCodes = require("http-status-codes");

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    console.log(user);
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error("Fetching user error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Fetching user failed" });
  }
};

module.exports = {
  getMe,
};
