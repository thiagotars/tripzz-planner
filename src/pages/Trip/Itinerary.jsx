import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import AddNewPlace from "../../components/AddNewPlace";
import PlacesToVisit from "../../components/PlacesToVisit";
import PlaceCard from "../../components/PlaceCard";
import { useState } from "react";
import { data } from "../../data/data";

const Itinerary = () => {
  const [openDay, setOpenDay] = useState({});
  const days = data[0].trip.itinerary;

  const handleOpenDay = (dayId) => {
    setOpenDay((prevIsOpen) => {
      return {
        ...prevIsOpen,
        [dayId]: !prevIsOpen[dayId],
      };
    });
  };

  const renderPlaceItems = (dayId) => {
    const day = days.find((day) => day.id === dayId);
    const placeItems = day.events.map((place) => {
      return (
        <div key={place.id} className="mt-6">
          <PlaceCard event={place} />
        </div>
      );
    });

    return <>{openDay[dayId] && placeItems}</>;
  };

  const dayItems = days.map((day) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return (
      <div key={day.id} className="py-10 border-b">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleOpenDay(day.id)}
        >
          <h4 className="text-[1em]">
            {daysOfWeek[day.date.getDay()] + ","}
            <span className="font-bold ml-2 text-[1.25em]">
              {day.date.getUTCDate()}
            </span>
          </h4>
          <div className="flex items-center gap-6">
            <h6 className="text-[.875em]">
              {day.events.length ? day.events.length : "No"} places
            </h6>
            {openDay[day.id] ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </div>
        {renderPlaceItems(day.id)}
        {openDay[day.id] && <AddNewPlace />}
      </div>
    );
  });

  return (
    <main className="w-[50rem]">
      <div className="p-10 pt-0">{dayItems}</div>
      {/* Day Closed*/}
      {/* <div className="py-10 px-10 border-b">
        <div className="flex justify-between items-center cursor-pointer">
          <h4 className="text-[1em]">
            Friday, <span className="font-bold ml-2 text-[1.25em]">25 th</span>
          </h4>
          <div className="flex items-center gap-6">
            <h6 className="text-[.875em]">4 places</h6>
            <FaChevronRight />
          </div>
        </div>
        <div className="">
          <div className="grid grid-rows-3 grid-flow-col gap-3 border mt-6 py-6 px-9 rounded-[25px]">
            <div className="flex items-center">
              <p className="w-[2.375rem] mr-3 text-[.875em] text-dark-grey">
                10:00
              </p>
              <h4 className="font-bold text-[.875em]">
                <span className="mr-1 font-normal">@</span>Parc Guell
              </h4>
            </div>
            <div className="flex items-center">
              <p className="w-[2.375rem] mr-3 text-[.875em] text-dark-grey">
                12:00
              </p>
              <h4 className="font-bold text-[.875em]">
                <span className="mr-1 font-normal">@</span>Con Gracia Restaurant
              </h4>
            </div>
            <div className="flex items-center">
              <p className="w-[2.375rem] mr-3 text-[.875em] text-dark-grey"></p>
              <h4 className="font-bold text-[.875em]">
                <span className="mr-1 font-normal">@</span>Parc de la Ciutadella
              </h4>
            </div>
            <div className="flex items-center">
              <p className="w-[2.375rem] mr-3 text-[.875em] text-dark-grey">
                19:00
              </p>
              <h4 className="font-bold text-[.875em]">
                <span className="mr-1 font-normal">@</span>Bacoa Restaurant
              </h4>
            </div>
          </div>
        </div>
  </div> */}
      <PlacesToVisit />
    </main>
  );
};

export default Itinerary;
