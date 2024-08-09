const Budget = require("../models/Budget");
const { StatusCodes } = require("http-status-codes");

const getBudget = async (req, res) => {
  const { tripId } = req.params;
  const budget = await Budget.findOne({ tripId });

  if (!budget) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Budget not found" });
  }

  res.status(StatusCodes.OK).json(budget);
};

const updateBudget = async (req, res) => {
  console.log(req.body);
  try {
    const { maxBudget } = req.body;
    const { tripId } = req.params;

    let budget = await Budget.findOne({ tripId });

    if (!budget) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Budget not found" });
    }

    if (maxBudget !== undefined) {
      budget.maxBudget = maxBudget;
    }

    // Save the updated budget
    await budget.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Budget updated successfully", budget });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = { getBudget, updateBudget };
