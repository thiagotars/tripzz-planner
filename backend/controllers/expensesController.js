const { StatusCodes } = require("http-status-codes");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const Trip = require("../models/Trip");

const getAllExpenses = async (req, res) => {
  try {
    const { budgetId } = req.params;

    const budget = await Budget.findById(budgetId).populate("expenses");

    if (!budget) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Budget not found" });
    }

    res.status(StatusCodes.OK).json(budget.expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const createExpense = async (req, res) => {
  try {
    const { createdAt, tripId, userId, budgetId, amount, description, type } =
      req.body;

    // Validate input data
    if (
      !tripId ||
      !userId ||
      !budgetId ||
      !amount ||
      !description ||
      typeof amount !== "number"
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Missing required fields or invalid data format" });
    }

    const newExpense = new Expense({
      createdAt,
      tripId,
      userId,
      budgetId,
      amount,
      description,
      type,
    });

    const session = await Expense.startSession();
    session.startTransaction();

    try {
      await newExpense.save({ session });

      await Budget.findByIdAndUpdate(
        budgetId,
        { $push: { expenses: newExpense._id } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      res
        .status(StatusCodes.CREATED)
        .json({ message: "Expense created successfully", expense: newExpense });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error creating expense:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    // Implementation for updating an expense
  } catch (error) {
    console.error("Error updating expense:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { expenseId, budgetId } = req.params;

    // Validate input data
    if (!expenseId || !budgetId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Missing required parameters" });
    }

    const session = await Expense.startSession();
    session.startTransaction();

    try {
      // Delete the expense
      const expense = await Expense.findByIdAndDelete(expenseId).session(
        session
      );

      if (!expense) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Expense not found" });
      }

      // Remove expense reference from the budget
      await Budget.findByIdAndUpdate(
        budgetId,
        { $pull: { expenses: expenseId } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      res
        .status(StatusCodes.OK)
        .json({ message: "Expense deleted successfully" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
