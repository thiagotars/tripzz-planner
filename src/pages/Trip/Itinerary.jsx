import React, { useState, useEffect } from "react";
import { FaPlus, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../AuthProvider"; // Adjust the import path as necessary
import PlacesToVisit from "../../components/PlacesToVisit";
import PlaceCard from "../../components/PlaceCard";

const Itinerary = () => {
  const { token, user } = useAuth(); // Use the useAuth hook to access user
  const { tripData, setTripData } = useOutletContext();
  const [searchTerms, setSearchTerms] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState({});
  const [sortedDays, setSortedDays] = useState([]);
  const [openDay, setOpenDay] = useState({});

  const sortPlacesByDate = (tripDays) => {
    return tripDays.map((day) => ({
      ...day,
      places: day.places
        .slice()
        .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)),
    }));
  };

  useEffect(() => {
    // Sort days by date
    const days = [...tripData.tripDays].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    // Sort places within each day
    const updatedDays = sortPlacesByDate(days);
    setSortedDays(updatedDays);

    // Initialize openDay state based on sortedDays
    setOpenDay(
      updatedDays.reduce((acc, day) => {
        acc[day._id] = true;
        return acc;
      }, {})
    );
  }, [tripData.tripDays]);

  useEffect(() => {
    const fetchPlaces = async () => {
      for (const dayId in searchTerms) {
        const searchTerm = searchTerms[dayId];
        if (searchTerm.trim().length < 2) {
          setSearchResults((prevResults) => ({
            ...prevResults,
            [dayId]: [],
          }));
          continue;
        }

        try {
          const response = await api.get(`/api/v1/fetchPlaces`, {
            params: {
              query: searchTerm,
              city: tripData.destination.city,
            },
          });

          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }

          setSearchResults((prevResults) => ({
            ...prevResults,
            [dayId]: response.data.results,
          }));
        } catch (error) {
          console.error("Error fetching places:", error.message);
        }
      }
    };

    fetchPlaces();
  }, [searchTerms, tripData.destination.city, token]);

  const handleOpenDay = (dayId) => {
    setOpenDay((prevOpenDay) => ({
      ...prevOpenDay,
      [dayId]: !prevOpenDay[dayId],
    }));
  };

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Special case for 11-13
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

  const handleAddPlace = async (dayItem) => {
    const selectedPlace = selectedPlaces[dayItem._id];
    if (!selectedPlace) return;

    try {
      // Create a new Date object from dayItem.date and set time to 00:00
      const date = new Date(dayItem.date);
      date.setHours(0, 0, 0, 0); // Ensure time is set to 00:00
      console.log(date);

      const newPlace = {
        dateTime: date.toISOString(), // Use ISO string format
        list: null,
        notes: "",
        name: selectedPlace.name,
        formatted_address: selectedPlace.formatted_address,
        website: selectedPlace.website,
        rating: selectedPlace.rating,
        formatted_phone_number: selectedPlace.formatted_phone_number,
        opening_hours: selectedPlace.opening_hours,
        price_level: selectedPlace.price_level,
        photos: selectedPlace.photos,
        types: selectedPlace.types,
        vicinity: selectedPlace.vicinity,
        utc_offset: selectedPlace.utc_offset,
        business_status: selectedPlace.business_status,
        geometry: selectedPlace.geometry,
        icon: selectedPlace.icon,
        icon_background_color: selectedPlace.icon_background_color,
        icon_mask_base_uri: selectedPlace.icon_mask_base_uri,
        place_id: selectedPlace.place_id,
        plus_code: selectedPlace.plus_code,
        reference: selectedPlace.reference,
        user_ratings_total: selectedPlace.user_ratings_total,
        userId: user._id,
        tripId: tripData._id,
      };

      const placeResponse = await api.post(`/api/v1/places`, newPlace);

      if (placeResponse.status !== 201) {
        throw new Error("Network response was not ok");
      }

      const createdPlace = placeResponse.data;
      console.log(createdPlace);
      const updatedDays = sortedDays.map((day) => {
        if (day._id === dayItem._id) {
          return {
            ...day,
            places: [...day.places, createdPlace],
          };
        }
        return day;
      });

      // Update tripData.places with the new place
      const updatedPlaces = [...tripData.places, createdPlace];

      setTripData((prevTripData) => ({
        ...prevTripData,
        tripDays: updatedDays,
        places: updatedPlaces, // Update the places array
      }));

      setSelectedPlaces((prevSelectedPlaces) => ({
        ...prevSelectedPlaces,
        [dayItem._id]: null,
      }));

      setSearchTerms((prevSearchTerms) => ({
        ...prevSearchTerms,
        [dayItem._id]: "",
      }));

      setSearchResults((prevSearchResults) => ({
        ...prevSearchResults,
        [dayItem._id]: [],
      }));
    } catch (error) {
      console.error("Error adding place to day:", error.message);
    }
  };

  const handleSearchChange = (dayId, searchTerm) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [dayId]: searchTerm,
    }));
  };

  const handleSelectPlace = async (dayId, place) => {
    try {
      const response = await api.get(`/api/v1/fetchPlaces/details`, {
        params: {
          placeId: place.place_id,
        },
      });

      if (response.status === 200) {
        const detailedPlace = response.data.result;
        setSelectedPlaces((prevSelectedPlaces) => ({
          ...prevSelectedPlaces,
          [dayId]: detailedPlace,
        }));
      } else {
        throw new Error("Failed to fetch detailed place information");
      }
    } catch (error) {
      console.error(
        "Error fetching detailed place information:",
        error.message
      );
    }

    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [dayId]: place.name,
    }));
    setSearchResults((prevResults) => ({
      ...prevResults,
      [dayId]: [],
    }));
  };

  const renderPlaceItems = (dayId) => {
    const day = sortedDays.find((day) => day._id === dayId);
    const eventItems = day.places.map((place, index) => (
      <div key={index} className="mt-6">
        <PlaceCard
          place={place}
          day={day}
          tripDays={tripData.tripDays}
          componentName="itinerary"
          eventId={place._id}
          tripId={place._id}
          lists={place.lists}
        />
      </div>
    ));

    return <>{openDay[dayId] && eventItems}</>;
  };

  const dayItems = sortedDays.map((day) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(day.date);
    const dayName = daysOfWeek[date.getUTCDay()];
    const dayDate = date.getUTCDate();
    const daySuffix = getDaySuffix(dayDate);

    return (
      <div key={day._id} className="py-10 border-b">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleOpenDay(day._id)}
        >
          <h4 className="text-[.875em] sm:text-[1em]">
            {dayName + ","}
            <span className="font-bold ml-2 text-[1.25em]">
              {dayDate}
              <sup>{daySuffix}</sup>
            </span>
          </h4>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <h6 className="text-[.75em] sm:text-[.875em]">
              {day.places.length ? day.places.length : "No"} events
            </h6>
            {openDay[day._id] ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </div>
        {renderPlaceItems(day._id)}
        {openDay[day._id] && (
          <div className="relative flex gap-6 flex-col sm:flex-row sm:justify-end items-end sm:items-start mt-16">
            {searchResults[day._id]?.length > 0 && (
              <ul className="absolute top-16 overflow-y-auto max-h-96 rounded-lg py-2 w-full md:w-[25rem] shadow-md bg-white">
                {searchResults[day._id].map((result) => (
                  <li
                    key={result.place_id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-light-grey cursor-pointer"
                    onClick={() => handleSelectPlace(day._id, result)}
                  >
                    <div className="flex flex-col">
                      <h6 className="font-semibold">{result.name}</h6>
                      <p className="text-sm text-medium-grey">
                        {result.formatted_address}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex sm:flex-row flex-col items-end justify-end gap-4 sm:gap-6 w-full">
              <input
                type="text"
                placeholder="Search places..."
                className="rounded-full text-[.875em] bg-light-grey px-6 py-2 w-full xs:w-[18rem]  font-normal focus:outline-none"
                value={searchTerms[day._id] || ""}
                onChange={(e) => handleSearchChange(day._id, e.target.value)}
              />
              <button
                className="text-[.875em] max-w-[10rem] px-4 py-2 bg-very-dark-grey hover:bg-dark-grey rounded-full text-white"
                onClick={() => handleAddPlace(day)}
              >
                Add place
              </button>
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <main className="w-[50rem]">
      <div className="px-6 md:px-0 py-0">{dayItems}</div>
      <PlacesToVisit city={tripData.destination.city} />
    </main>
  );
};

export default Itinerary;
