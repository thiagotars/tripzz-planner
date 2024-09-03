//  const handleStartDateClick = () => {
import React, { useState } from "react";
import api from "../utils/api";
import { FaRegCalendar, FaSpinner } from "react-icons/fa";
import Calendar from "../components/Calendar";
import { cn } from "../utils/cn";
import { useAuth } from "../AuthProvider"; // Adjust the import path as necessary

const SearchPlace = ({ fetchUserTrips }) => {
  const { user } = useAuth(); // Use the useAuth hook to access user
  // console.log(user);
  const initialTripState = {
    createdBy: user._id,
    destination: {
      city: "",
      country: "",
      capital: "",
      population: "",
      language: "",
      flag: "",
      currency: "",
      image: "",
      photos: "",
      vicinity: "",
      utc_offset: "",
      geometry: "",
      place_id: "",
      continents: "",
      timezones: "",
    },
    startDate: null,
    endDate: null,
  };

  const [newTrip, setNewTrip] = useState(initialTripState);
  const [suggestions, setSuggestions] = useState([]);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingCityDetails, setIsLoadingCityDetails] = useState(false);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);

  const handleDestinationChange = async (event) => {
    const input = event.target.value;
    console.log(input);

    setNewTrip((prevState) => ({
      ...prevState,
      destination: { ...prevState.destination, city: input },
    }));

    if (input.length > 2) {
      try {
        const response = await api.get(
          `/api/v1/fetchPlaces/autocomplete?input=${input}`
        );

        const data = response.data;
        console.log(data);
        if (data.predictions) {
          setSuggestions(data.predictions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching place suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    setIsLoadingCityDetails(true);
    try {
      const response = await api.get(`/api/v1/fetchPlaces/details`, {
        params: {
          placeId: placeId,
        },
      });
      // console.log(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error("Error fetching place details:", error);

      throw error;
    } finally {
      setIsLoadingCityDetails(false);
    }
  };

  const fetchPopulationData = async (city, country) => {
    // console.log("Fetching population data for:", city, country);
    try {
      const response = await fetch(
        `http://api.geonames.org/searchJSON?q=${city}&country=&maxRows=1&username=thiagotarsitano`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.geonames && data.geonames.length > 0) {
        const population = data.geonames[0].population;
        // console.log("Population data:", population);
        return population;
      } else {
        console.error("No population data found for:", city, country);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching population data:", error);
      return 0;
    }
  };

  const fetchCountryData = async (country) => {
    console.log(country);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const countryData = data[0];
      // console.log(countryData);

      const formattedCurrency = Object.keys(countryData.currencies || {}).map(
        (code) => {
          const { name, symbol } = countryData.currencies[code];
          return {
            code,
            name,
            symbol,
          };
        }
      );
      // console.log(formattedCurrency);
      return {
        language: Object.values(countryData.languages)[0],
        currency: formattedCurrency,
        flag: countryData.flag,
        continents: countryData.continents,
        capital: countryData.capital,
        timezones: countryData.timezones,
      };
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const fetchImageFromUnsplash = async (city) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results[0]?.urls?.regular || "";
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
      return "";
    }
  };

  const extractCityAndCountry = (address) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = address;

    const localityElement = tempElement.querySelector(".locality");
    const countryElement = tempElement.querySelector(".country-name");

    const locality = localityElement ? localityElement.textContent.trim() : "";
    const country = countryElement ? countryElement.textContent.trim() : "";

    return { city: locality, country: country };
  };

  const handleSuggestionSelect = async (suggestion) => {
    // console.log(suggestion);
    setSuggestions([]);
    const placeDetails = await fetchPlaceDetails(suggestion.place_id);

    const city = suggestion.terms[0].value;
    const country = suggestion.terms[suggestion.terms.length - 1].value;

    const population = await fetchPopulationData(city, country);
    const countryData = await fetchCountryData(country);
    const unsplashImage = await fetchImageFromUnsplash(city);

    const { city: fetchedCity, country: fetchedCountry } =
      extractCityAndCountry(placeDetails.adr_address);

    setNewTrip((prevState) => ({
      ...prevState,
      createdBy: user._id,
      destination: {
        city: fetchedCity || placeDetails.name,
        country: country,
        capital: countryData.capital,
        population: population,
        language: countryData.language,
        flag: countryData.flag,
        currency: countryData.currency,
        image: unsplashImage,
        photos: placeDetails.photos,
        vicinity: placeDetails.vicinity,
        utc_offset: placeDetails.utc_offset,
        geometry: placeDetails.geometry,
        place_id: placeDetails.place_id,
        continents: countryData.continents,
        timezones: countryData.timezones,
      },
    }));
  };

  const handleCreateTrip = async () => {
    if (!newTrip.startDate || !newTrip.endDate) {
      setErrorMessage("Start and end dates are required.");
      return;
    }

    if (!newTrip.destination.city) {
      setErrorMessage("Please select a destination.");
      return;
    }

    if (newTrip.endDate <= newTrip.startDate) {
      setErrorMessage("End date must be after start date.");
      return;
    }

    setIsCreatingTrip(true);

    try {
      const response = await api.post("/api/v1/trips", newTrip);

      // console.log("Trip created:", response.data);
      fetchUserTrips();
      resetForm();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        setErrorMessage(error.response.data.error || "Failed to create trip.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage("No response from server. Please try again.");
      } else {
        console.error("Error in request setup:", error.message);
        setErrorMessage("Error in request setup.");
      }
    } finally {
      setIsCreatingTrip(false);
    }
  };

  const resetForm = () => {
    setNewTrip(initialTripState);
    setSuggestions([]);
    setErrorMessage("");
  };

  const handleStartDateClick = () => {
    setIsEndDateOpen(false);

    setIsEndDateOpen(false);
    setIsStartDateOpen((prevState) => !prevState);
  };

  const handleEndDateClick = () => {
    setIsStartDateOpen(false);
    setIsEndDateOpen((prevState) => !prevState);
  };

  const handleStartDateSelect = (date) => {
    setNewTrip((prevState) => ({ ...prevState, startDate: date }));
    setIsStartDateOpen(false);
  };

  const handleEndDateSelect = (date) => {
    setNewTrip((prevState) => ({ ...prevState, endDate: date }));
    setIsEndDateOpen(false);
  };

  const setFormattedDate = (date) => {
    const { $D, $M, $y } = date;
    const formattedDate = `${$y}-${$M + 1}-${$D}`;
    return formattedDate;
  };

  return (
    <div className="sm:px-16 sm:mt-24 mb-20 sm:mb-40 px-6 flex flex-col justify-between pt-10 pb-9 mx-auto mt-[72px] w-full max-w-[800px]">
      <h2 className="lg:text-[1.75em] sm:text-[1.5em] text-[1.25em] pb-1 border-b border-medium-grey font-bold text-very-dark-grey">
        Plan your next trip
      </h2>
      <div className="flex flex-col justify-between mt-8 text-[14px]">
        <div className="sm:flex-row md:items-center flex flex-col items-start gap-4 w-full">
          <div className="relative md:w-1/2 w-full">
            <input
              type="text"
              onChange={handleDestinationChange}
              placeholder="Where to? e.g. Barcelona"
              className="2xl:text-[1em] xs:px-6 text-[.875em] w-full py-3 px-4 rounded-full focus:outline-none placeholder:text-medium-grey text-very-dark-grey"
              value={newTrip.destination.city}
            />
            {isLoadingCityDetails && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <FaSpinner className="animate-spin text-gray-400" />
              </div>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative md:w-1/2 w-full flex bg-white rounded-full">
            <button
              onClick={handleStartDateClick}
              className={cn(
                isStartDateOpen
                  ? "text-very-dark-grey hover:text-dark-grey"
                  : newTrip.startDate
                  ? "text-very-dark-grey"
                  : "text-medium-grey",
                "xs:px-6 w-1/2 flex items-center justify-between py-3 px-4"
              )}
            >
              <p className={cn("2xl:text-[1em] text-[.875em]")}>
                {newTrip.startDate
                  ? `${setFormattedDate(newTrip.startDate)}`
                  : "Start Date"}
              </p>
              <FaRegCalendar />
            </button>
            <div className="border-l border-light-grey"></div>
            <button
              onClick={handleEndDateClick}
              className={cn(
                isEndDateOpen
                  ? "text-very-dark-grey hover:text-dark-grey"
                  : newTrip.endDate
                  ? "text-very-dark-grey"
                  : "text-medium-grey",
                "xs:px-6 w-1/2 flex items-center justify-between py-3 px-4"
              )}
            >
              <p className="2xl:text-[1em] text-[.875em]">
                {newTrip.endDate
                  ? `${setFormattedDate(newTrip.endDate)}`
                  : "End Date"}
              </p>
              <FaRegCalendar />
            </button>
            {isStartDateOpen && (
              <Calendar
                onDateSelect={handleStartDateSelect}
                date={newTrip.startDate}
                setIsStartDateOpen={setIsStartDateOpen}
                setIsEndDateOpen={setIsEndDateOpen}
                newTrip={newTrip}
              />
            )}
            {isEndDateOpen && (
              <Calendar
                onDateSelect={handleEndDateSelect}
                date={newTrip.endDate}
                setIsStartDateOpen={setIsStartDateOpen}
                setIsEndDateOpen={setIsEndDateOpen}
                newTrip={newTrip}
              />
            )}
          </div>
        </div>
        <div className="flex gap-6 items-center mt-6">
          <button
            className={cn(
              "bg-very-dark-grey py-3 px-4 rounded-full text-white font-bold w-[200px] flex justify-center items-center hover:bg-dark-grey",
              isCreatingTrip ? "opacity-50 cursor-not-allowed" : ""
            )}
            onClick={handleCreateTrip}
            disabled={isCreatingTrip}
          >
            {isCreatingTrip ? (
              <div className="flex items-center justify-center h-5 w-5">
                <FaSpinner className="animate-spin text-white" />
              </div>
            ) : (
              "Letzz Go!"
            )}
          </button>
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPlace;
