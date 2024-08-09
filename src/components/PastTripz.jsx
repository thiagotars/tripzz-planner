import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa"; // Import the necessary icons
import CityCard from "./CityCard";

const PastTripz = ({ pastTrips, userId, onTripDeleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!pastTrips) return null;

  const toggleTrips = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full pb-10 border-b border-medium-grey">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleTrips}
      >
        <h2 className="md:text-[1.25em] text-[1em] font-semibold">
          <span className="text-dark-grey">past</span> tripzz
        </h2>
        <div className="ml-2">
          {isExpanded ? (
            <FaChevronDown className="text-lg" />
          ) : (
            <FaChevronRight className="text-lg" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="max-w-[800px] mt-10">
          {pastTrips.length > 0 ? (
            pastTrips.map((trip) => {
              const startDate = trip.startDate
                ? new Date(trip.startDate)
                : null;
              const endDate = trip.endDate ? new Date(trip.endDate) : null;

              return (
                <div key={trip._id} className="mb-6">
                  <CityCard
                    userId={userId}
                    trip={trip}
                    startDate={startDate}
                    endDate={endDate}
                    onTripDeleted={onTripDeleted}
                  />
                </div>
              );
            })
          ) : (
            <h3 className="text-[.875em]">You have no past tripzz</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default PastTripz;
