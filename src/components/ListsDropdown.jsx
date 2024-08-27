import React, { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../utils/api";
import { FaSpinner } from "react-icons/fa";

const ListsDropdown = ({ lists, placeId, place, setLocalPlace }) => {
  const { tripData, setTripData } = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSelect = async (list) => {
    setIsLoading(true);
    // console.log(list);
    try {
      const newPlace = { ...place, list };
      setLocalPlace(newPlace);
      setIsOpen(false);

      const response = await api.patch(`/api/v1/places/${placeId}`, { list });
      // console.log(response.data.data.list);
      const updatedPlace = response.data.data;

      setTripData((prevTripData) => ({
        ...prevTripData,
        places: prevTripData.places.map((p) =>
          p._id === place._id ? updatedPlace : p
        ),
        tripDays: prevTripData.tripDays.map((day) => ({
          ...day,
          places: day.places.map((p) =>
            p._id === place._id ? updatedPlace : p
          ),
        })),
      }));
    } catch (error) {
      console.error("Error updating place list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative flex flex-col w-full">
      <button
        className={`bg-white flex items-center justify-center sm:w-full min-w-[6rem] py-2 rounded-full border ${
          place.list
            ? "text-green-500 border-green-500"
            : "bg-white border hover:border-medium-grey"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isLoading}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin text-green-500" size={18} />
        ) : (
          <h3 className="text-[.75em] text-center">
            {place.list ? place.list.name : "Add to List"}
          </h3>
        )}
      </button>
      <div
        className={`absolute z-30 max-h-40 overflow-scroll top-12 flex-col gap-2 ${
          isOpen ? "flex " : "hidden"
        } w-full py-2 bg-white rounded-xl drop-shadow-md`}
      >
        {lists.length > 0 ? (
          lists.map((list) => {
            console.log(list);
            return (
              <h3
                key={list._id}
                className="text-[.75em] py-2 text-center text-dark-grey hover:text-black cursor-pointer"
                onClick={() => handleSelect(list._id)}
              >
                {list.name}
              </h3>
            );
          })
        ) : (
          <h3 className="text-[.75em] text-dark-grey">No lists available</h3>
        )}
      </div>
    </div>
  );
};

export default ListsDropdown;
