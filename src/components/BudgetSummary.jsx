import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import CurrencyDropdown from "./CurrencyDropdown";
import { useAuth } from "../AuthProvider";
import api from "../utils/api";

const BudgetSummary = () => {
  const { tripData, setTripData } = useOutletContext();
  const { user } = useAuth();

  const expenses = tripData.budget.expenses || [];
  const [inputLimit, setInputLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isConversionShowing, setIsConversionShowing] = useState(true);

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );

  const userCurrency = user.currency;
  const tripCurrency = tripData.destination.currency[0];
  const [selectedCurrency, setSelectedCurrency] = useState(tripCurrency);

  const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
      if (typeof fromCurrency !== "string" || typeof toCurrency !== "string") {
        throw new Error("Invalid currency code(s)");
      }
      const url = `https://api.exchangerate-api.com/v4/latest/${encodeURIComponent(
        fromCurrency
      )}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const rate = data.rates[toCurrency];

      if (!rate) {
        throw new Error(`Exchange rate for ${toCurrency} not found`);
      }

      return rate;
    } catch (error) {
      console.error("Error fetching exchange rate:", error.message);
      return 1;
    }
  };

  useEffect(() => {
    const fetchRate = async () => {
      const rate = await getExchangeRate(userCurrency.code, tripCurrency.code);
      setExchangeRate(rate);
      console.log("Exchange rate:", rate);
    };

    fetchRate();
  }, [userCurrency.code, tripCurrency.code]);

  const handleSetLimit = async () => {
    setLoading(true);
    console.log(userCurrency.code, tripCurrency.code);
    try {
      let limit;
      console.log(selectedCurrency.code, tripCurrency.code);
      if (selectedCurrency.code === tripCurrency.code) {
        limit = parseFloat(inputLimit);
      }
      if (selectedCurrency.code !== tripCurrency.code) {
        limit = parseFloat(inputLimit) * exchangeRate;
      }

      const response = await api.patch(`/api/v1/trips/${tripData._id}/budget`, {
        maxBudget: limit,
        expenses: tripData.budget.expenses,
      });

      console.log("Response from setting limit:", response.data);

      setTripData((prevTripData) => ({
        ...prevTripData,
        budget: {
          ...prevTripData.budget,
          maxBudget: response.data.budget.maxBudget,
        },
      }));
      setis;
      setInputLimit("");
    } catch (error) {
      console.error(
        "Error setting budget limit:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetLimit = async () => {
    setLoading(true);

    try {
      const response = await api.patch(`/api/v1/trips/${tripData._id}/budget`, {
        maxBudget: 0,
        expenses: tripData.budget.expenses,
      });

      console.log("Response from resetting limit:", response.data);

      setTripData((prevTripData) => ({
        ...prevTripData,
        budget: {
          ...prevTripData.budget,
          maxBudget: response.data.budget.maxBudget,
        },
      }));
    } catch (error) {
      console.error(
        "Error resetting budget limit:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShowConversionClick = () => {
    setIsConversionShowing((prev) => !prev);
  };
  // console.log(selectedCurrency);

  const maxBudget = tripData.budget.maxBudget;
  // console.log(maxBudget, totalSpent);

  const remainingBudget = maxBudget - totalSpent;
  const percentageSpent = maxBudget > 0 ? (totalSpent / maxBudget) * 100 : 0;

  return (
    <div className="w-full flex sm:flex-row flex-col mt-10 text-very-dark-grey bg-light-grey md:px-10 px-8 py-8 rounded-[1.25rem]">
      <div className="flex flex-col justify-between sm:w-1/2 w-full pr-0 sm:pr-10 sm:pb-0 pb-8 flex-grow">
        <div className="w-full flex justify-between items-center mb-6 sm:mb-10">
          <h2 className="text-[.875em] font-semibold">Total spent</h2>
          <div>
            <button onClick={handleShowConversionClick}>
              {isConversionShowing ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6 justify-center w-full">
          <div className="w-full flex items-center">
            <h1 className="font-bold text-[1em] xs:text-[1.25em] md:text-[1.5em] w-1/2">
              <span className="font-normal mr-2 text-[.75em]">
                {tripCurrency.symbol}
              </span>
              {totalSpent.toFixed(2)}
            </h1>
            {isConversionShowing && (
              <h1 className="font-bold text-[1em] xs:text-[1.25em] md:text-[1.5em] w-1/2 pl-4 border-l border-medium-grey">
                <span className="font-normal mr-2 text-[.75em]">
                  {userCurrency.symbol}
                </span>
                {(totalSpent / exchangeRate).toFixed(2)}{" "}
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full sm:w-1/2 border-t sm:border-t-0 sm:border-l border-medium-grey pl-0 sm:pl-10 sm:pt-0 pt-8 h-auto sm:h-24">
        <div className="flex flex-col w-full h-full gap-2">
          {tripData.budget.maxBudget > 0 ? (
            <div className="flex sm:flex-row flex-col h-full">
              <div className="flex flex-col gap-2 w-full sm:w-2/5">
                <div className="w-full flex gap-4 sm:gap-1 flex-row sm:flex-col items-center sm:items-start">
                  <p className="text-[.815em]">Your limit:</p>
                  <h1 className="font-semibold text-[.875em]">
                    <span className="font-normal text-[.875em] mr-1">
                      {tripCurrency.symbol}
                    </span>
                    {tripData.budget.maxBudget.toFixed(2)}
                  </h1>
                </div>
                <div className="flex w-full flex-row gap-4 sm:gap-1 sm:flex-col items-center sm:items-start">
                  <p className="text-[.815em]">Remaining:</p>
                  <h1 className="font-semibold text-[.875em]">
                    <span className="font-normal text-[.875em] mr-1">
                      {tripCurrency.symbol}
                    </span>
                    {remainingBudget.toFixed(2)}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-col items-start justify-between w-full mt-3 sm:mt-0 sm:w-3/5 h-full sm:pb-[.375rem]">
                <button
                  className="flex self-end justify-center items-center bg-very-dark-grey hover:bg-dark-grey text-[.875rem] font-semibold text-white px-6 h-10 rounded-full mt-4 sm:mt-0 w-24"
                  onClick={handleResetLimit}
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin text-white" />
                  ) : (
                    "Reset"
                  )}
                </button>
                <div className="w-full flex flex-col gap-1 ">
                  <p className="text-[.815em] self-end" id="percentage">
                    {percentageSpent.toFixed(0)}%
                  </p>
                  <div
                    id="progress-bar"
                    className="h-[.375rem] rounded-full bg-medium-grey relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                      style={{ width: `${percentageSpent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <h1 className="text-[.875em] font-semibold">Budget limit</h1>
              <div className="flex sm:flex-row flex-col justify-between mt-6">
                <div className="flex h-10">
                  <CurrencyDropdown
                    selectedCurrency={selectedCurrency}
                    onCurrencyChange={(currency) =>
                      setSelectedCurrency(currency)
                    }
                  />
                  <input
                    className="rounded-full sm:w-[5rem] md:w-[6rem] w-1/2 px-4 py-2 ml-2 text-[.875em] focus:outline-none"
                    type="text"
                    value={inputLimit}
                    onChange={(e) => setInputLimit(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <button
                  className="bg-very-dark-grey hover:bg-dark-grey text-[.875rem] font-semibold text-white px-6 rounded-full sm:mt-0 mt-6 h-10 w-28 self-end"
                  onClick={handleSetLimit}
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin text-white" />
                  ) : (
                    "Set Limit"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
