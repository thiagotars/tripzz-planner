import React, { useState, useEffect, useRef } from "react";
import {
  FaRegTrashAlt,
  FaStar,
  FaSpinner,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import DropdownSchedule from "./DropdownSchedule";
import DaysDropdown from "./DaysDropdown";
import { useOutletContext } from "react-router-dom";
import api from "../utils/api";
import ListsDropdown from "./ListsDropdown";

const PlaceCard = ({
  place,
  day: propDay,
  tripDays,
  componentName,
  eventId,
}) => {
  const { tripData, setTripData } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState(place.notes || "");
  const [localPlace, setLocalPlace] = useState(place);
  const [isTimeSet, setIsTimeSet] = useState(false);

  useEffect(() => {}, [place]);
  // console.log(isTimeSet);
  console.log(place);
  console.log(tripData);

  useEffect(() => {
    setIsTimeSet(!!place.dateTime);
  }, [place.dateTime]);

  const saveNotes = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/api/v1/places/${place._id}`, {
        notes,
      });

      if (response.status === 200) {
        const updatedPlace = response.data.data;
        console.log(updatedPlace);
        const updatedPlaces = tripData.places.map((p) =>
          p._id === place._id ? updatedPlace : p
        );

        const filteredPlaces = updatedPlaces.filter(Boolean);

        setTripData({ ...tripData, places: filteredPlaces });
      } else {
        console.error("Failed to save notes:", response.status);
      }
    } catch (error) {
      console.error("Error updating notes:", error);
    } finally {
      setLoading(false);
      setIsNotesOpen(false);
    }
  };

  const getDayWithPlace = (placeId) => {
    for (const day of tripData.tripDays) {
      if (
        day.places &&
        day.places.some((place) => {
          return place.place_id === placeId;
        })
      ) {
        return day;
      }
    }
    return null;
  };

  const day = propDay || getDayWithPlace(place.place_id);

  const getPhotoUrl = (photoReference, maxWidth = 400) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }`;
  };

  const openInGoogleMaps = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}`;
    window.open(directionsUrl, "_blank");
  };

  const formatDate = (date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = date.getDate();
    const daySuffix = (day) => {
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

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayWithSuffix = day + daySuffix(day);

    return `${dayOfWeek}, ${dayWithSuffix}`;
  };

  const deleteItemFromList = async (placeId) => {
    setLoading(true);
    try {
      const deletePlaceResponse = await api.delete(`/api/v1/places/${placeId}`);

      if (deletePlaceResponse.status !== 200) {
        throw new Error("Failed to delete place from database");
      }

      const updatedPlaces = tripData.places.filter(
        (place) => place._id !== placeId
      );

      const updatedTripDays = tripData.tripDays.map((tripDay) => {
        const updatedPlacesForDay = tripDay.places.filter(
          (place) => place._id !== placeId
        );

        return { ...tripDay, places: updatedPlacesForDay };
      });

      setTripData({
        ...tripData,
        places: updatedPlaces,
        tripDays: updatedTripDays,
      });
    } catch (error) {
      console.error("Error deleting place from list:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePlaceFromItinerary = async (placeId, dayId) => {
    setLoading(true);
    console.log(placeId, dayId);
    try {
      const response = await api.patch(`/api/v1/places/${placeId}`, {
        dateTime: "",
      });
      const updatedPlace = response.data.data;
      console.log(updatedPlace);

      const updatedPlaces = tripData.places.map((place) =>
        place._id === placeId ? updatedPlace : place
      );

      const updatedTripDays = tripData.tripDays.map((tripDay) => {
        if (tripDay._id === dayId) {
          const updatedPlacesForDay = tripDay.places
            .map((place) => (place._id === placeId ? updatedPlace : place))
            .filter((place) => place._id !== placeId);

          return { ...tripDay, places: updatedPlacesForDay };
        }
        return tripDay;
      });

      setTripData({
        ...tripData,
        places: updatedPlaces,
        tripDays: updatedTripDays,
      });
    } catch (error) {
      console.error("Error deleting place from itinerary:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between mt-10 sm:mt-8 bg-light-grey sm:h-[9.5rem] rounded-[1.25rem] relative">
        <div className="w-full flex flex-col sm:flex-row px-6 py-6 sm:relative">
          <div className="absolute sm:relative top-0 left-0 flex flex-row sm:flex-col w-full sm:w-24 p-4 sm:p-0">
            {componentName === "itinerary" && (
              <div className="flex sm:flex-col justify-between h-full w-full">
                <DropdownSchedule
                  isTimeSet={isTimeSet}
                  setIsTimeSet={setIsTimeSet}
                  place={place}
                  day={day}
                  setLocalPlace={setLocalPlace}
                />
                <div className="border-t w-full"></div>
                <ListsDropdown
                  lists={tripData.lists}
                  placeId={place._id}
                  place={place}
                  setLocalPlace={setLocalPlace}
                />
              </div>
            )}

            {componentName === "list" ? (
              day ? (
                <div className="flex h-full sm:flex-col flex-row justify-between">
                  <DaysDropdown
                    place={place}
                    tripDays={tripDays}
                    setTripData={setTripData}
                    tripId={tripData._id}
                    day={day}
                    formatDate={formatDate(day.date)}
                    eventId={eventId}
                    setLocalPlace={setLocalPlace}
                  />

                  <div className="border-t w-full"></div>
                  <ListsDropdown
                    lists={tripData.lists}
                    placeId={place._id}
                    place={place}
                    setLocalPlace={setLocalPlace}
                  />
                </div>
              ) : (
                <div className="flex sm:flex-col flex-row gap-2 justify-between h-full">
                  <DaysDropdown
                    place={place}
                    tripDays={tripDays}
                    setTripData={setTripData}
                    tripId={tripData._id}
                    eventId={eventId}
                    setLocalPlace={setLocalPlace}
                  />
                  <div className="border-t w-full"></div>
                  <ListsDropdown
                    lists={tripData.lists}
                    placeId={place._id}
                    place={place}
                    setLocalPlace={setLocalPlace}
                  />
                </div>
              )
            ) : null}
          </div>
          <div className="flex flex-1 flex-col w-full sm:ml-4 sm:pl-4 sm:border-l justify-between text-[.875em] ">
            <div className="flex flex-col gap-[.375rem]">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between w-full font-semibold items-start">
                  <h2 className="">{"@ " + place.name}</h2>
                  {place.rating && (
                    <div className="flex gap-1 items-center">
                      <p>{place.rating}</p>
                      <FaStar className="w-3" />
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <button
                  className="flex gap-2 items-center"
                  onClick={() => {
                    setIsNotesOpen(!isNotesOpen);
                  }}
                >
                  <p className="text-[.875em]">Your notes to this place</p>
                  <div className="w-[.675rem] h-[.675rem]">
                    {isNotesOpen ? (
                      <FaChevronDown className="h-full w-full" />
                    ) : (
                      <FaChevronRight className="h-full w-full" />
                    )}
                  </div>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 sm:mt-0">
              <div className="flex gap-2 sm:gap-4 text-[.875em] text-white ">
                {place.website && (
                  <button>
                    <a
                      href={place.website}
                      className="px-4 py-2 rounded-full text-very-dark-grey border border-medium-grey hover:bg-white bg-light-grey"
                      target="_blank"
                    >
                      Website
                    </a>
                  </button>
                )}

                <button
                  onClick={() => {
                    openInGoogleMaps();
                  }}
                  className="px-4 py-2 rounded-full text-very-dark-grey border border-medium-grey hover:bg-white bg-light-grey"
                  target="_blank"
                >
                  Direction
                </button>
              </div>

              <button
                className="text-very-dark-grey hover:text-dark-grey p-[.7rem] bg-very-dark-grey hover:bg-dark-grey rounded-full"
                onClick={() => {
                  if (componentName === "list") {
                    deleteItemFromList(place._id);
                  }
                  if (componentName === "itinerary") {
                    deletePlaceFromItinerary(place._id, day._id);
                  }
                }}
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin text-white" />
                ) : (
                  <FaRegTrashAlt className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full sm:w-[18rem] h-56 xs:h-80 sm:h-full rounded-[1.25rem] overflow-hidden">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            {place.photos && place.photos.length > 0 ? (
              <img
                src={getPhotoUrl(place.photos[0].photo_reference)}
                alt={place.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
        </div>
      </div>
      {isNotesOpen && (
        <textarea
          id="notes-container"
          className="w-full border-medium-grey outline-none border min-h-[10rem] max-w-[41rem] mt-6 mb-16 rounded-[1.25rem] sm:ml-36 p-4 text-[.875em]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={saveNotes}
        ></textarea>
      )}
    </div>
  );
};

export default PlaceCard;
