import React, { useState } from "react";
import {
  FaRegTrashAlt,
  FaSpinner,
  FaArrowRight,
  FaRegCalendarAlt,
} from "react-icons/fa";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import DateCalendar from "./DateCalendar";
import { useAuth } from "../AuthProvider";

const CityCard = ({ trip, startDate, endDate, onTripDeleted }) => {
  const { user } = useAuth();
  // console.log(user);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleDeleteTrip = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      const response = await api.delete(`/api/v1/trips/${trip._id}`);

      if (response.status === 200) {
        onTripDeleted();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const openInGoogleMaps = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${trip.destination.geometry.location.lat},${trip.destination.geometry.location.lng}`;
    window.open(directionsUrl, "_blank");
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  function formatDateRange(startDate, endDate) {
    const options = { month: "short", day: "numeric" };

    const startMonthDay = startDate.toLocaleDateString("en-US", options);
    const endDay = endDate.getDate();

    const [startMonth, startDay] = startMonthDay.split(" ");

    return (
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt />
        <div className="flex gap-1 items-center">
          <p>{startMonth}</p>
          <p>{startDay}</p>
          <FaArrowRight className="inline-block mx-1" />
          <p>{endDay}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/user/${user._id}/trips/${trip._id}/overview`}
      key={trip._id}
      className=" flex text-very-dark-grey flex-col-reverse sm:flex-row mt-6 justify-between rounded-[20px] slider-item bg-light-grey sm:h-[9.5rem] relative hover:drop-shadow-md"
    >
      <div className="flex flex-col justify-start w-full px-6 my-6">
        <div className="flex sm:flex-row flex-col-reverse h-full">
          <div className="hidden sm:flex gap-4 sm:items-start">
            <p className="font-semibold text-[.875em]">
              {formatDateRange(startDate, endDate)}
            </p>
          </div>
          <div className="flex flex-1 flex-col w-full sm:ml-4 sm:pl-4 md:pl-6 sm:border-l justify-between text-[.875em] ">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between w-full font-semibold items-start">
                <h2 className="">
                  {"@ " +
                    trip.destination.city +
                    ", " +
                    trip.destination.country}
                </h2>
                <div>
                  <div className="bg-user w-7 h-7 bg-cover"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center h-10 mt-6 sm:mt-0">
              <button
                onClick={openInGoogleMaps}
                className="px-4 py-2 h-full rounded-full sm:text-[1em] text-[.875em] text-very-dark-grey border border-medium-grey hover:bg-white bg-light-grey"
                target="_blank"
              >
                Direction
              </button>

              <button
                className="text-very-dark-grey h-full hover:text-dark-grey px-4 py-2 bg-very-dark-grey hover:bg-dark-grey rounded-full"
                onClick={handleDeleteTrip}
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin text-white" />
                ) : (
                  <div className="flex gap-2 sm:text-[1em] text-[.875em] items-center text-white font-semibold">
                    <h3>Delete </h3>
                    <FaRegTrashAlt className="text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {trip.destination.image ? (
        <div className="relative h-full sm:min-w-[13rem]">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[20px]"></div>
          )}
          <img
            src={trip.destination.image}
            alt={trip.destination.city}
            onLoad={handleImageLoad}
            className={`h-56 xs:h-64 sm:h-full w-full object-cover rounded-[20px] ${
              imageLoading ? "hidden" : "block"
            }`}
          />
          <div className="sm:hidden absolute top-4 left-4 flex gap-2 items-center">
            <DateCalendar date={startDate} />
            <FaArrowRight className="text-light-grey" />
            <DateCalendar date={endDate} />
          </div>
        </div>
      ) : (
        <div className="relative h-28 w-60 bg-light-grey rounded-[20px]">
          <div className="sm:hidden absolute top-4 left-4 flex gap-2 items-center">
            <DateCalendar date={startDate} />
            <FaArrowRight className="text-light-grey" />
            <DateCalendar date={endDate} />
          </div>
        </div>
      )}
    </Link>
  );
};

export default CityCard;
