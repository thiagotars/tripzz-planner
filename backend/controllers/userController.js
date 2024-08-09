const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get user details
const getUserDetails = async (req, res) => {
  try {
    // console.log(req.params);
    console.log(req);
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getUserDetails,
  updateUserDetails,
};
