import React from "react";
import CityCard from "./CityCard";

const OngoingTrips = ({ ongoingTrips, userId, onTripDeleted }) => {
  if (!ongoingTrips) return null;
  console.log(userId);

  return (
    <div className="w-full mb-16">
      <h2 className="md:text-[1.25em] text-[1em] font-semibold">
        <span className="text-dark-grey">ongoing</span> trip
      </h2>
      {ongoingTrips.length > 0 && (
        <div className="max-w-[800px] mt-10">
          {ongoingTrips.map((trip) => {
            const startDate = trip.startDate ? new Date(trip.startDate) : null;
            const endDate = trip.endDate ? new Date(trip.endDate) : null;

            return (
              <div key={trip._id} className="mb-6">
                <CityCard
                  userId={userId}
                  trip={trip}
                  startDate={startDate}
                  endDate={endDate}
                  onTripDeleted={onTripDeleted} // Ensure onTripDeleted is passed to CityCard
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OngoingTrips;
