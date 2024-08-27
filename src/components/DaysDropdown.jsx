import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import api from "../utils/api";
import { FaSpinner } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const DaysDropdown = ({ place, setLocalPlace }) => {
  const { tripData, setTripData } = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

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
  }, []);

  const getOpenDays = (openingHours) => {
    if (
      !openingHours ||
      !openingHours.periods ||
      openingHours.periods.length === 0
    ) {
      return [0, 1, 2, 3, 4, 5, 6];
    }

    if (
      openingHours.weekday_text &&
      openingHours.weekday_text.length === 7 &&
      openingHours.weekday_text.every((text) => text.includes("Open 24 hours"))
    ) {
      return [0, 1, 2, 3, 4, 5, 6];
    }

    const openDays = new Set();
    openingHours.periods.forEach((period) => {
      openDays.add(period.open.day);
    });

    return Array.from(openDays);
  };

  const openDays = getOpenDays(place?.opening_hours);

  const filteredTripDays =
    openDays.length === 7
      ? [...tripData.tripDays].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )
      : tripData.tripDays
          .filter((day) => {
            const dayOfWeek = new Date(day.date).getUTCDay();
            return openDays.includes(dayOfWeek);
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const dayOfMonth = date.getDate();
    const suffix =
      dayOfMonth > 3 && dayOfMonth < 21
        ? "th"
        : ["st", "nd", "rd"][((dayOfMonth % 10) - 1) % 3] || "th";

    return `${formattedDate}${suffix}`;
  };

  const handleSelect = async (d) => {
    setLoading(true);

    try {
      const newDate = new Date(d.date).toISOString();
      const updatedPlace = { ...place, dateTime: newDate };
      setLocalPlace(updatedPlace);
      setIsOpen(false);

      await api.patch(`/api/v1/places/${place._id}`, { dateTime: newDate });

      setTripData((prevTripData) => {
        const updatedPlaces = prevTripData.places.map((p) =>
          p._id === place._id ? updatedPlace : p
        );

        // Update the tripDays array
        const updatedTripDays = prevTripData.tripDays.map((day) => {
          const updatedDayPlaces = day.places.filter(
            (p) => p._id !== place._id
          );
          return {
            ...day,
            places: updatedDayPlaces,
          };
        });

        const newDayIndex = updatedTripDays.findIndex(
          (day) =>
            new Date(day.date).toDateString() ===
            new Date(newDate).toDateString()
        );

        if (newDayIndex !== -1) {
          updatedTripDays[newDayIndex].places.push(updatedPlace);
        } else {
          updatedTripDays.push({
            date: newDate,
            places: [updatedPlace],
            events: [],
          });
        }

        return {
          ...prevTripData,
          places: updatedPlaces,
          tripDays: updatedTripDays,
        };
      });

      // console.log(tripData);
    } catch (error) {
      console.error("Error updating place list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative flex flex-col w-full">
      {loading ? (
        <button
          className="flex items-center justify-center sm:w-full min-w-[6rem] py-2 rounded-full bg-white border border-blue-500"
          disabled
        >
          <FaSpinner className="animate-spin text-blue-500" size={18} />
        </button>
      ) : (
        <>
          {place?.dateTime ? (
            <button
              className="flex items-center justify-center sm:w-full min-w-[6rem] py-2 rounded-full bg-white border border-blue-500"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <h3 className="text-[.75em] text-center text-blue-500">
                {formatDateTime(place.dateTime)}
              </h3>
            </button>
          ) : (
            <button
              className="flex items-center justify-center sm:w-full min-w-[6rem] py-2 rounded-full bg-white border hover:border-medium-grey"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <h3 className="text-[.75em] text-center text-very-dark-grey">
                Set date
              </h3>
            </button>
          )}
        </>
      )}

      <div
        className={`absolute max-h-20 overflow-scroll top-10 flex-col gap-2 ${
          isOpen ? "flex z-20" : "hidden"
        } w-full px-4 py-2 bg-white rounded-xl drop-shadow-md`}
      >
        {filteredTripDays.length > 0 ? (
          filteredTripDays.map((d) => {
            const date = new Date(d.date);
            const dayOfMonth = date.getUTCDate();
            const month = date.toLocaleDateString("en-US", { month: "short" });
            const formattedDate = `${month} ${dayOfMonth}${getOrdinalSuffix(
              dayOfMonth
            )}`;
            return (
              <h3
                key={d._id}
                className="text-[.75em] text-center py-2 text-dark-grey hover:text-black cursor-pointer"
                onClick={() => handleSelect(d)}
              >
                {formattedDate}
              </h3>
            );
          })
        ) : (
          <h3 className="text-[.75em] text-dark-grey">No open days</h3>
        )}
      </div>
    </div>
  );
};

export default DaysDropdown;
