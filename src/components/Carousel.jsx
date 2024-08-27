import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ days, tripData }) => {
  // console.log(days);
  // console.log(tripData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % days.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = currentIndex === 0 ? days.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  function getTimeFromDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid Date";
    }

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  const tripDays = days.map((day, index) => {
    console.log(day);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const daysOfMonth = (day) => {
      let dayOfMonth = day.date.getDate();

      if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
        return "st";
      } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
        return "nd";
      } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
        return "rd";
      } else {
        return "th";
      }
    };

    return (
      <div
        key={day._id}
        style={{ display: index === currentIndex ? "block" : "none" }}
        className="flex flex-col items-between w-full sm:w-1/2 bg-light-grey p-8 rounded-[1.25rem]"
      >
        <div className="flex justify-between text-very-dark-grey">
          <h4 className="font-normal">
            {daysOfWeek[day.date.getDay()] + ", "}
            <span className="font-semibold">
              {day.date ? day.date.getUTCDate() + daysOfMonth(day) : ""}
            </span>
          </h4>
          <div className="flex gap-2 text-very-dark-grey items-center">
            {currentIndex === 0 ? (
              <FaChevronLeft className="disabled cursor-pointer w-4 h-4" />
            ) : (
              <FaChevronLeft
                className="hover:text-dark-grey cursor-pointer w-4 h-4"
                onClick={handlePrevClick}
              />
            )}
            {currentIndex === days.length - 1 ? (
              <FaChevronRight className="disabled cursor-pointer w-4 h-4" />
            ) : (
              <FaChevronRight
                className="hover:text-dark-grey cursor-pointer w-4 h-4"
                onClick={handleNextClick}
              />
            )}
          </div>
        </div>
        <Link
          className=""
          to={`/user/${tripData.createdBy}/trips/${tripData._id}/itinerary`}
        >
          <div className="flex flex-1 flex-col gap-4 max-h-36 mt-6 overflow-scroll">
            {day.places.length > 0 ? (
              day.places.map((place) => (
                <div
                  key={place._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="text-[.75em] text-very-dark-grey">
                      {place.dateTime
                        ? getTimeFromDate(new Date(place.dateTime))
                        : "00:00"}
                    </div>
                    <div className=" flex w-full">
                      <h4 className="text-[0.875em] ml-3">
                        <span className="mr-1">@</span>
                        {place.name}
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[0.875em] pb-16 max-w-[12rem] text-dark-grey">
                Add places to your itinerary by{" "}
                <span className="font-semibold"> clicking here</span>
              </p>
            )}
          </div>
        </Link>
      </div>
    );
  });

  // console.log(tripDays);

  return <>{tripDays}</>;
};

export default Carousel;
