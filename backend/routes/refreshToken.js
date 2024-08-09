const express = require("express");
const router = express.Router();
const { refreshToken } = require("../controllers/refreshTokenController");

router.post("/", refreshToken);

module.exports = router;
