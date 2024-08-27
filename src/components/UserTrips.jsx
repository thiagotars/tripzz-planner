import React from "react";
import OngoingTrips from "./OngoingTrips";
import UpcomingTripz from "./UpcomingTripz";
import PastTripz from "./PastTripz";

const UserTrips = ({ userTrips, userId, onTripDeleted }) => {
  const ongoingTrips = userTrips?.ongoingTrips ?? [];
  const upcomingTrips = userTrips?.upcomingTrips ?? [];
  const pastTrips = userTrips?.pastTrips ?? [];
  // console.log(userTrips);

  return (
    <>
      <div className="flex flex-col gap-16 md:px-16 justify-between px-6 py-10 mx-auto w-full max-w-[928px]">
        {ongoingTrips.length > 0 && (
          <OngoingTrips
            ongoingTrips={ongoingTrips}
            userId={userId}
            onTripDeleted={onTripDeleted}
          />
        )}

        <UpcomingTripz
          upcomingTrips={upcomingTrips}
          userId={userId}
          onTripDeleted={onTripDeleted}
        />

        <PastTripz
          pastTrips={pastTrips}
          userId={userId}
          onTripDeleted={onTripDeleted}
        />
      </div>
    </>
  );
};

export default UserTrips;
