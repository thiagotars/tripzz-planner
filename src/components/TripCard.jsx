import React from "react";

const TripCard = () => {
  return (
    <Link
      to="trip"
      className="flex flex-col rounded-[20px] border min-w-[240px] md:w-1/3 xs:w-1/2 w-full"
    >
      <div className="min-h-[160px] bg-cover bg-center bg-barcelona rounded-[20px]"></div>
      <div className="flex flex-col justify-between w-full px-4 my-4">
        <div className="flex flex-col justify-center py-auto">
          <h3 className="font-semibold text-[.875em]">Barcelona - Spain</h3>
          <p className="text-[.815em] mt-2">24th-27th, July 2024</p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
