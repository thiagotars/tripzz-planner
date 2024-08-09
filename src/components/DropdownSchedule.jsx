import React, { useState, useEffect, useRef } from "react";
import { FaRegClock, FaSpinner } from "react-icons/fa6";
import api from "../utils/api";
import { useOutletContext } from "react-router-dom";

const DropdownSchedule = ({ place, day, setLocalPlace, setIsTimeSet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const { tripData, setTripData } = useOutletContext();
  const [selectedTime, setSelectedTime] = useState("Time");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (place.dateTime) {
      const placeTime = new Date(place.dateTime);
      const hours = placeTime.getHours();
      const minutes = placeTime.getMinutes();
      if (hours !== 0 || minutes !== 0) {
        setSelectedTime(
          placeTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setIsTimeSet(true);
      }
    }
  }, [place.dateTime, setIsTimeSet]);

  const parseOpenHours = (openingHours, dayOfWeek) => {
    if (!openingHours || !openingHours.periods) {
      return [];
    }

    const openPeriods = openingHours.periods.filter((period) => {
      return period.open && period.close && period.open.day === dayOfWeek;
    });

    const hoursSet = new Set();

    openPeriods.forEach((period) => {
      const openTime = formatTime(period.open.time);
      const closeTime = formatTime(period.close.time);
      let currentTime = openTime;

      if (!hoursSet.has(openTime)) {
        hoursSet.add(openTime);
      }

      while (currentTime < closeTime) {
        const [hour, minute] = currentTime.split(":");
        const nextMinute = parseInt(minute) + 30;
        const nextHour = nextMinute >= 60 ? parseInt(hour) + 1 : hour;
        const formattedMinute = nextMinute % 60;
        currentTime = `${nextHour.toString().padStart(2, "0")}:${formattedMinute
          .toString()
          .padStart(2, "0")}`;

        if (!hoursSet.has(currentTime)) {
          hoursSet.add(currentTime);
        }
      }
    });

    // If no specific opening hours are found, provide a full-day schedule
    if (hoursSet.size === 0) {
      for (let hour = 0; hour < 24; hour++) {
        const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
        hoursSet.add(formattedHour);
        const formattedHalfHour = `${hour.toString().padStart(2, "0")}:30`;
        hoursSet.add(formattedHalfHour);
      }
    }

    return [...hoursSet].sort();
  };

  const formatTime = (time) => {
    return `${time.slice(0, 2)}:${time.slice(2)}`;
  };

  const dayOfWeek = day.date.getDay();
  const formattedOpenHours = parseOpenHours(place.opening_hours, dayOfWeek);

  const handleScheduleChange = async (selectedHour) => {
    setIsLoading(true); // Start loading spinner
    try {
      const newSelectedTime = new Date(day.date);
      const [hour, minute] = selectedHour.split(":");
      newSelectedTime.setHours(parseInt(hour));
      newSelectedTime.setMinutes(parseInt(minute));

      const response = await api.patch(`/api/v1/places/${place._id}`, {
        dateTime: newSelectedTime,
      });

      setLocalPlace(response.data);
      setIsOpen(false);
      setSelectedTime(
        newSelectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setIsTimeSet(true);
      setTripData((prevData) => {
        const updatedTripDays = prevData.tripDays.map((tripDay) => {
          if (tripDay._id === day._id) {
            const updatedPlaces = tripDay.places.map((p) => {
              if (p._id === place._id) {
                return { ...p, dateTime: newSelectedTime };
              }
              return p;
            });
            return { ...tripDay, places: updatedPlaces };
          }
          return tripDay;
        });

        return { ...prevData, tripDays: updatedTripDays };
      });
    } catch (error) {
      console.error("Error updating place time:", error.message);
    } finally {
      setIsLoading(false); // Stop loading spinner
      setIsOpen(false); // Close dropdown
    }
  };

  return (
    <div className="relative flex flex-col sm:w-full" ref={dropdownRef}>
      <button
        className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-full border ${
          selectedTime !== "Time"
            ? "border-purple-500 text-purple-500"
            : "border"
        } bg-white `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin text-dark-grey" size={18} />
        ) : (
          <>
            <FaRegClock
              className={`w-3 ${
                selectedTime !== "Time" ? "text-purple-500" : "text-dark-grey"
              }`}
            />
            <h3
              className={`text-[.75em] ${
                selectedTime !== "Time"
                  ? "text-purple-500"
                  : "text-very-dark-grey"
              }`}
            >
              {selectedTime}
            </h3>
          </>
        )}
      </button>
      <div
        className={`absolute max-h-36 sm:max-h-20 overflow-scroll top-10 flex-col ${
          isOpen ? "flex" : "hidden"
        } w-full px-5 py-2 bg-white rounded-xl gap-2 drop-shadow-lg z-30`}
      >
        {formattedOpenHours.length > 0 ? (
          formattedOpenHours.map((hour, index) => (
            <h3
              key={index}
              className="flex flex-col items-center text-[.75em] text-very-dark-grey hover:text-dark-grey cursor-pointer py-1"
              onClick={() => handleScheduleChange(hour)}
            >
              {hour}
            </h3>
          ))
        ) : (
          <h3 className="text-[.75em] text-very-dark-grey">Closed today</h3>
        )}
      </div>
    </div>
  );
};

export default DropdownSchedule;
