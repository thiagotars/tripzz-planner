const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Refresh token required" });
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid refresh token" });
    }
    const newToken = user.createJWT();
    res.status(StatusCodes.OK).json({ accessToken: newToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid refresh token" });
  }
};

module.exports = {
  refreshToken,
};
