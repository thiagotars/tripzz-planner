import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import PlaceCard from "../../components/PlaceCard";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import ListMenu from "../../components/ListMenu";
import api from "../../utils/api";
import PlacesToVisit from "../../components/PlacesToVisit";

const Lists = () => {
  const { user } = useAuth();
  const { tripData, setTripData } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPlace, setLoadingPlace] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [newListName, setNewListName] = useState("");
  const [listFilter, setListFilter] = useState("all");

  const handleSearchChange = async (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (searchValue.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get("/api/v1/fetchPlaces", {
        params: {
          query: searchValue,
          city: tripData.destination.city,
        },
      });

      console.log(response.data.results);
      if (response.status === 200) {
        console.log("Suggestions fetched:", response.data.results);
        setSuggestions(response.data.results || []);
      } else {
        throw new Error("Failed to fetch search suggestions");
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = (list) => {
    setTripData((prevTripData) => ({
      ...prevTripData,
      lists: [...(prevTripData.lists || []), list],
    }));
  };

  const handleCreateListClick = async () => {
    if (newListName.trim()) {
      setLoading(true);
      try {
        const response = await api.post(`/api/v1/trips/${tripData._id}/lists`, {
          name: newListName,
          userId: user._id,
        });

        handleCreateList(response.data.list);
        setNewListName("");
        setListFilter("all");
      } catch (error) {
        console.error("Error creating list:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSuggestionClick = async (place) => {
    setSearchTerm(place.name);
    setSuggestions([]);
    try {
      const response = await api.get(`/api/v1/fetchPlaces/details`, {
        params: {
          placeId: place.place_id,
        },
      });

      if (response.status === 200) {
        const detailedPlace = response.data.result;
        console.log("Detailed Place:", detailedPlace);
        setSelectedPlace(detailedPlace);
      } else {
        throw new Error("Failed to fetch detailed place information");
      }
    } catch (error) {
      console.error(
        "Error fetching detailed place information:",
        error.message
      );
    }
  };

  const handleCreatePlace = async () => {
    if (!selectedPlace) return;

    setLoading(true);

    const newPlace = {
      dateTime: "",
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

    try {
      const response = await api.post("/api/v1/places", newPlace);

      setTripData((prevTripData) => ({
        ...prevTripData,
        places: [...(prevTripData.places || []), response.data],
      }));

      setSelectedPlace(null);
      setSearchTerm("");
      setListFilter("all");
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-[800px] md:px-0 px-6">
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row w-full mb-24 gap-6 justify-between p-0 sm:p-10 sm:py-6">
          <div className="sm:w-1/2 w-full p-8 bg-light-grey rounded-[1.25rem]">
            <h1 className="font-semibold text-very-dark-grey">Search places</h1>
            <p className="text-medium-grey text-[.815em] max-w-[12rem] mt-2">
              Find places you want to visit on your trip.
            </p>

            <div className="flex flex-col gap-4 mt-6">
              <div className="relative">
                <input
                  type="text"
                  className="rounded-full w-full h-10 py-2 px-6 text-[.875em] focus:outline-none bg-white"
                  placeholder="Type a place"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {loading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <FaSpinner className="animate-spin text-gray-400" />
                  </div>
                )}
                {suggestions.length > 0 && (
                  <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="px-4 py-2 cursor-pointer hover:bg-light-grey"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="font-medium">{suggestion.name}</div>
                        {suggestion.formatted_address && (
                          <div className="text-gray-600 text-sm">
                            {suggestion.formatted_address}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                className="flex justify-center items-center cursor-pointer w-32 bg-very-dark-grey text-white h-10 rounded-full text-[.875em] hover:bg-dark-grey"
                onClick={handleCreatePlace}
                disabled={!selectedPlace || loading}
              >
                {loadingPlace ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Add place"
                )}
              </button>
            </div>
          </div>
          <div className="sm:w-1/2 w-full p-8 bg-white rounded-[1.25rem]">
            <h1 className="font-semibold text-very-dark-grey">Create list</h1>
            <p className="text-medium-grey text-[.815em] max-w-[12rem] mt-2">
              Create lists to organize your places by category.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <div className="relative">
                <input
                  type="text"
                  className="rounded-full w-full h-10 py-2 px-6 text-[.875em] focus:outline-none bg-light-grey"
                  placeholder="e.g. Museums"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
              <button
                className="cursor-pointer w-32 bg-very-dark-grey text-white h-10 rounded-full text-[.875em] hover:bg-dark-grey"
                onClick={handleCreateListClick}
                disabled={!newListName.trim() || loading}
              >
                Create list
              </button>
            </div>
          </div>
        </div>

        {fetchError && <div className="text-red-500 mb-4">{fetchError}</div>}
        <ListMenu
          lists={tripData.lists || []}
          setListFilter={setListFilter}
          listFilter={listFilter}
        />
        {tripData.places
          .filter(
            (place) =>
              listFilter === "all" ||
              (place.list && place.list._id === listFilter._id)
          )
          .map(
            (place) =>
              place && (
                <PlaceCard
                  key={place._id}
                  place={place}
                  tripDays={tripData.tripDays}
                  componentName="list"
                  listId={place.list ? place.list._id : "defaultListId"}
                  eventId={null}
                />
              )
          )}
      </div>
      <PlacesToVisit city={tripData.destination.city} />
    </main>
  );
};

export default Lists;
