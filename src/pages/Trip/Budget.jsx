import {
  FaPlus,
  FaChevronDown,
  FaChevronRight,
  FaSpinner,
  FaRegTrashAlt,
} from "react-icons/fa";
import ExpenseTypeDropdown from "../../components/ExpenseTypeDropdown";
import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import BudgetSummary from "../../components/BudgetSummary";
import React from "react";
import { useAuth } from "../../AuthProvider";
import { clearErrorMessage } from "../../utils/clearErrorMessage";

const Budget = () => {
  const { user } = useAuth();
  const { tripData, setTripData } = useOutletContext();
  const [expenses, setExpenses] = useState([]);
  const [isExpensesOpen, setIsExpensesOpen] = useState(false); // Initially false
  const [loading, setLoading] = useState(false);
  const [expenseDeleteLoading, setExpenseDeleteLoading] = useState({});
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const [newExpense, setNewExpense] = useState({
    tripId: tripData._id,
    budgetId: "",
    userId: user._id,
    amount: "",
    description: "",
    type: { type: "Type", icon: "" },
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (tripData) {
      const expensesData = tripData.budget?.expenses || [];
      setExpenses(expensesData);
      setNewExpense((prev) => ({
        ...prev,
        budgetId: tripData.budget?._id,
      }));
      setIsExpensesOpen(expensesData.length > 0); // Set open based on expenses length
    }
  }, [tripData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedExpenseId &&
        !event.target.closest(`[data-expense-id="${selectedExpenseId}"]`)
      ) {
        setSelectedExpenseId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedExpenseId]);

  const handleExpensesClick = () => {
    setIsExpensesOpen((prev) => !prev);
  };

  const validateExpense = () => {
    if (
      !newExpense.description.trim() ||
      !newExpense.amount ||
      newExpense.type.type === "Type"
    ) {
      setErrorMessage("All fields must be filled.");
      clearErrorMessage(setErrorMessage);
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleAddExpense = async () => {
    if (!validateExpense()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        `/api/v1/trips/${tripData._id}/budget/${newExpense.budgetId}/expenses`,
        { ...newExpense, amount: parseFloat(newExpense.amount) || 0 }
      );

      const newExpenseData = response.data.expense;

      setTripData((prevTripData) => ({
        ...prevTripData,
        budget: {
          ...prevTripData.budget,
          expenses: [...(prevTripData.budget.expenses || []), newExpenseData],
        },
      }));

      setNewExpense({
        tripId: tripData._id,
        budgetId: tripData.budget._id,
        userId: user._id,
        amount: "",
        description: "",
        type: { type: "Other", icon: "" },
      });
      setIsExpensesOpen(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding expense:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    setExpenseDeleteLoading((prev) => ({ ...prev, [expenseId]: true }));

    try {
      const response = await api.delete(
        `/api/v1/trips/${tripData._id}/budget/${newExpense.budgetId}/expenses/${expenseId}`
      );

      if (response.status === 200) {
        setTripData((prevTripData) => ({
          ...prevTripData,
          budget: {
            ...prevTripData.budget,
            expenses: prevTripData.budget.expenses.filter(
              (expense) => expense._id !== expenseId
            ),
          },
        }));
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting expense:", error.message);
    } finally {
      setExpenseDeleteLoading((prev) => ({ ...prev, [expenseId]: false }));
      setSelectedExpenseId(null);
    }
  };

  if (!tripData) return null;

  const handleExpenseClick = (expenseId) => {
    setSelectedExpenseId((prevId) => (prevId === expenseId ? null : expenseId));
  };

  const expenseItems =
    expenses.length > 0 ? (
      expenses.map((expense) =>
        expense ? (
          <div
            key={expense._id}
            className="flex items-center gap-2 flex-grow"
            data-expense-id={expense._id}
          >
            <div
              className="bg-light-grey py-3 px-5 flex-grow rounded-lg cursor-pointer"
              onClick={() => handleExpenseClick(expense._id)}
            >
              <div className="flex flex-col w-full">
                <div className="flex w-full justify-between text-[.875em] ">
                  <p>{expense.description}</p>
                  <p className="font-semibold">
                    {tripData.destination.currency[0].symbol}{" "}
                    {(expense.amount || 0).toFixed(2)}
                  </p>
                </div>
                <p className="text-[.75em] text-dark-grey">
                  {expense.type.type}
                </p>
              </div>
            </div>
            {selectedExpenseId === expense._id && (
              <button
                className="bg-red-500 text-white flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteExpense(expense._id);
                }}
              >
                {expenseDeleteLoading[expense._id] ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaRegTrashAlt />
                )}
              </button>
            )}
          </div>
        ) : null
      )
    ) : (
      <p className="text-[.815em]">No expenses yet</p>
    );

  return (
    <main className="w-[50rem] sm:px-0 px-6">
      <BudgetSummary />
      <div className="mt-12 mb-28 w-full flex sm:flex-row flex-col">
        <div className="flex flex-col w-full sm:w-1/2 px-6 sm:px-10 py-8 bg-light-grey rounded-[1.25rem]">
          <h5 className="font-semibold text-[.875em] mb-8">Add new expense</h5>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="rounded-full w-full text-[.875em] bg-white px-6 py-2 focus:outline-none"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              placeholder="e.g. 'Lunch at Bacoa'"
            />
            <div className="flex gap-3">
              <ExpenseTypeDropdown
                selectedType={newExpense.type}
                onTypeChange={(type) => setNewExpense({ ...newExpense, type })}
              />
              <div className=" flex items-center rounded-full px-6 text-[.875em] w-1/2 bg-white">
                <p>{tripData.destination.currency[0].symbol}</p>
                <input
                  className="rounded-full w-1/2 bg-white pl-2 focus:outline-none"
                  type="text"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-6">
            <p id="error-message" className="text-red-500 text-[.75em] mr-4">
              {errorMessage}
            </p>
            <button
              className="bg-very-dark-grey hover:bg-dark-grey font-semibold text-[.875em] text-white rounded-full w-32 h-10 flex items-center justify-center"
              onClick={handleAddExpense}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Add Expense"
              )}
            </button>
          </div>
        </div>
        <div className="w-full sm:w-1/2 mt-16 sm:mt-0 sm:px-10 px-0">
          <div
            className="flex justify-between mb-8 items-center cursor-pointer"
            onClick={() => handleExpensesClick()}
          >
            <h5 className="font-semibold text-[.875em]">Expenses</h5>
            <span className="text-[.75em] text-dark-grey">
              {isExpensesOpen ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          {isExpensesOpen && (
            <div className="flex flex-col gap-2">{expenseItems}</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Budget;
