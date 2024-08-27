import {
  FaRegTrashAlt,
  FaUserPlus,
  FaArrowLeft,
  FaSpinner,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import React, { useState } from "react";
import { useAuth } from "../AuthProvider";

const TripSummary = ({ tripData }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const tripInfo = tripData;
  const [isLoading, setIsLoading] = useState(false);

  const formatPopulation = (population) => {
    if (population >= 1000000) {
      const millions = Math.floor(population / 1000000);
      const remainder = population % 1000000;
      const formattedPopulation = `${millions.toLocaleString(
        "de-DE"
      )}.${remainder.toLocaleString("de-DE")}`;
      return formattedPopulation;
    } else {
      return population.toLocaleString("de-DE");
    }
  };

  const handleDeleteTrip = async (tripId) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/api/v1/trips/${tripId}`);
      if (response.status === 200) {
        navigate(`/user/${user._id}`);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 401) {
          console.error("Unauthorized. Redirecting to login.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  function formatDateRange(startDate, endDate) {
    const options = { month: "short", day: "numeric" };

    const startMonthDay = startDate.toLocaleDateString("en-US", options);
    const endDay = endDate.getDate();

    const [startMonth, startDay] = startMonthDay.split(" ");

    return (
      <div className="flex items-center gap-3">
        <div>{startMonth}</div>
        <span className="flex items-center gap-2">
          {startDay} <FaArrowRightLong /> {endDay}
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-between sm:px-16 xs:px-10 px-8 xs:py-10 py-6 mx-auto md:mt-[120px] xs:mt-16 mt-8 xs:mb-16 mb-8 w-full max-w-[760px] rounded-[25px] border-2 border-light-grey">
      <div className="text-white">
        <div className="flex items-center justify-between">
          <h2 className="lg:text-[1.75em] sm:text-[1.5em] text-[1.25em] font-semibold">
            Trip to {tripInfo.destination.city}
          </h2>

          <Link
            className="flex items-center h-[32px] text-[14px]"
            to={`/user/${user._id}`}
          >
            <FaArrowLeft />
            <p className="ml-2 sm:flex hidden font-semibold">All trips</p>
          </Link>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mt-6 sm:gap-0 gap-6">
          <div className="flex flex-col xs:w-2/3 w-full gap-1 sm:text-[.875em] text-[.75em]">
            <div className="flex gap-1">
              <h6 className="font-semibold">Population:</h6>
              <h6 className="font-normal ml-2">
                {formatPopulation(tripInfo.destination.population)}
              </h6>
            </div>
            <div className="flex gap-1">
              <h6 className="font-semibold">Language:</h6>
              <h6 className="font-normal ml-2">
                {tripInfo.destination.language}
              </h6>
            </div>
            <div className="flex gap-1">
              <h6 className="font-semibold">Country:</h6>
              <h6 className="font-normal ml-2">
                {tripInfo.destination.country}
              </h6>
            </div>
            <div className="flex gap-1">
              <h6 className="font-semibold">Capital:</h6>
              <h6 className="font-normal ml-2">
                {tripInfo.destination.capital[0]}
              </h6>
            </div>
            <div className="flex gap-1">
              <h6 className="font-semibold">Currency:</h6>
              <h6 className="font-normal ml-2">
                {`${tripInfo.destination.currency[0].name} (${tripInfo.destination.currency[0].symbol})`}
              </h6>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 sm:w-1/3 sm:justify-end">
            <div className="flex items-center bg-white h-10 rounded-full px-2 py-1">
              <div className="sm:w-8 sm:h-8 w-7 h-7 bg-user rounded-full bg-cover"></div>
              <FaUserPlus className="sm:w-5 w-4 sm:h-5 h-4 sm:ml-3 ml-2 cursor-pointer text-very-dark-grey hover:text-dark-grey" />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex justify-between mt-6 sm:pt-6 pt-4 border-t border-light-grey items-center">
          <button className="flex gap-4 items-center">
            <FaRegCalendarAlt className="w-4 text-white" />
            <p className="font-semibold text-[.875em] md:text-[1em] text-white">
              {formatDateRange(tripInfo.startDate, tripInfo.endDate)}
            </p>
          </button>
          <button
            onClick={() => {
              handleDeleteTrip(tripInfo._id);
            }}
            className="text-very-dark-grey rounded-full flex items-center justify-center sm:h-12 h-12 w-12 max-w-[10rem] sm:w-full sm:text-[.875em] text-[.75em] font-bold bg-light-grey hover:bg-medium-grey"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin w-4 h-4 text-very-dark-grey" />
            ) : (
              <>
                <p className="font-semibold sm:flex hidden mr-3">Delete Trip</p>
                <FaRegTrashAlt className="w-4 h-4 text-very-dark-grey" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
