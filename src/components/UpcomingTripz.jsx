import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import CityCard from "./CityCard";

const UpcomingTripz = ({ upcomingTrips, userId, onTripDeleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (upcomingTrips.length > 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [upcomingTrips]);

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
          <span className="text-dark-grey">upcoming</span> tripzz
        </h2>
        <div className="ml-2">
          {isExpanded ? (
            <FaChevronDown className="text-lg" />
          ) : (
            <FaChevronRight className="text-lg" />
          )}
        </div>
      </div>
      {isExpanded && upcomingTrips && (
        <div className="max-w-[800px] mt-10">
          {upcomingTrips.length > 0 ? (
            upcomingTrips.map((trip) => {
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
            <h3 className="text-[.875em]">You have no upcoming tripzz</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingTripz;
