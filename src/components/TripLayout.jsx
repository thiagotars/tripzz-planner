import React, { useEffect, useState, useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import TripSummary from "./TripSummary";
import TripMenu from "./TripMenu";
import api from "../utils/api";
import { useAuth } from "../AuthProvider";

const TripLayout = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSingleTrip = async () => {
      try {
        const response = await api.get(`/api/v1/trips/${tripId}`);
        const tripData = response.data;

        if (tripData.startDate) {
          tripData.startDate = new Date(tripData.startDate);
        }
        if (tripData.endDate) {
          tripData.endDate = new Date(tripData.endDate);
        }

        const daysResponse = await api.get(`/api/v1/trips/${tripId}/days`);
        const days = daysResponse.data.map((day) => ({
          ...day,
          date: new Date(day.date),
        }));

        const fetchPlacesPromises = days.map(async (day) => {
          const placesResponse = await api.get(`/api/v1/places/byDate`, {
            params: {
              userId: user._id,
              tripId: tripId,
              date: day.date.toISOString(),
            },
          });
          const places = placesResponse.data;
          return {
            ...day,
            places: places, // Assuming places is an array of full place objects
          };
        });

        // Wait for all promises to resolve
        const daysWithPlaces = await Promise.all(fetchPlacesPromises);

        const budgetResponse = await api.get(`/api/v1/trips/${tripId}/budget`);
        const budget = budgetResponse.data;

        const placesResponse = await api.get("/api/v1/places", {
          params: {
            tripId: tripId,
            userId: user._id,
          },
        });
        const places = placesResponse.data;

        const listsResponse = await api.get(`/api/v1/trips/${tripId}/lists`, {
          userId: user._id,
        });
        const lists = listsResponse.data;

        const expensesResponse = await api.get(
          `/api/v1/trips/${tripId}/budget/${budget._id}/expenses`
        );
        const expenses = expensesResponse.data;

        setTripData({
          ...tripData,
          tripDays: daysWithPlaces,
          budget: { ...budget, expenses: expenses },
          lists,
          places,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSingleTrip();
  }, [tripId]);

  return (
    <div className="">
      {tripData && (
        <>
          <img
            src={tripData.destination.image}
            className="absolute top-0 w-screen h-[560px] sm:h-[610px] md:h-[640px] 2xl:h-[680px] -z-20 object-cover"
          />
          <div className="absolute top-0 w-screen h-[560px] sm:h-[610px] md:h-[640px] 2xl:h-[680px] bg-black bg-opacity-60 -z-10"></div>
        </>
      )}

      {tripData && (
        <div className="md:px-0 px-6">
          <TripSummary tripData={tripData} />
        </div>
      )}
      <TripMenu />
      <div className="flex justify-center">
        <Outlet context={{ tripData, setTripData }} />
      </div>
    </div>
  );
};

export default TripLayout;
