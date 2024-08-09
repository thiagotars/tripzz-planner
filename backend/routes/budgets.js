const express = require("express");
const router = express.Router();
const { getBudget, updateBudget } = require("../controllers/budgetsController");

// Get budget details
router.get("/", getBudget);
// Update budget details
router.put("/", updateBudget);

module.exports = router;
