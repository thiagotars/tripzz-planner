import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FaPlus, FaStar } from "react-icons/fa";

const PlacesToEat = ({ city }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(city);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await api.get(
          `/api/v1/fetchPlaces/popular-restaurants?city=${city}`
        );
        setPlaces(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular places:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [city]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data.</div>;

  return (
    <div className="my-[6rem]">
      <h2 className="text-[1.5em] font-bold">Explore Places to Eat</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
        {places.map((place, index) => (
          <div
            key={index}
            className="flex items-center h-[5rem] pr-2 md:pr-4 border rounded-[1.25rem] overflow-hidden"
          >
            <div
              className="h-full rounded-[1.25rem] min-w-[5.5rem] md:min-w-[6.5rem] bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${
                  place.photos
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                        place.photos[0].photo_reference
                      }&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                    : "default-image-url"
                })`,
              }}
            ></div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.75em] md:text-[.875em] font-semibold">
                  {place.name}
                </p>
                <div className="flex text-[.75rem] gap-x-2 md:gap-x-3 flex-wrap text-dark-grey">
                  {/* {place.user_ratings_total}
                  <p>|</p> */}
                  <div className="flex gap-1 items-center">
                    <p>{place.rating}</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>{place.price_level && "$".repeat(place.price_level)}</p>
                </div>
              </div>
              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToEat;
