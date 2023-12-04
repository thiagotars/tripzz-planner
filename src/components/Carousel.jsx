import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Carousel = (props) => {
  const itinerary = props.data;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % itinerary.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex =
      currentIndex === 0 ? itinerary.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const itineraryDays = itinerary.map((day, index) => {
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
      <div
        key={day.id}
        style={{ display: index === currentIndex ? "block" : "none" }}
        className="w-full border p-6 rounded-[1.25rem]"
      >
        <div className="flex justify-between">
          <h4 className="font-normal">
            {daysOfWeek[day.date.getDay()] + ", "}
            <span className="font-bold text-[1.25em]">
              {day.date.getUTCDate()}
            </span>
          </h4>
          <div className="flex gap-2 text-black items-center">
            {currentIndex === 0 ? (
              <FaChevronLeft className="disabled cursor-pointer w-4 h-4" />
            ) : (
              <FaChevronLeft
                className="hover:text-dark-grey cursor-pointer w-4 h-4"
                onClick={handlePrevClick}
              />
            )}
            {currentIndex === itinerary.length - 1 ? (
              <FaChevronRight className="disabled cursor-pointer w-4 h-4" />
            ) : (
              <FaChevronRight
                className="hover:text-dark-grey cursor-pointer w-4 h-4"
                onClick={handleNextClick}
              />
            )}
          </div>
        </div>
        <Link className="h-full flex flex-col gap-2 pt-6 pb-4" to="itinerary">
          {day.events.length ? (
            day.events.map((event) => {
              return (
                <div
                  key={event.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full ${event.image} bg-cover`}
                    ></div>
                    <h4 className="text-[0.875em]">
                      <span className="mr-1 ml-4 pb-1 font-normal">@</span>
                      {event.title}
                    </h4>
                  </div>
                  <p className="w-[2rem] mr-3 text-[0.875em] text-dark-grey">
                    {event.time}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-[0.875em] h-full pt-6 text-center">
              Add your fist place
            </p>
          )}
        </Link>
      </div>
    );
  });

  return (
    <div className="w-full flex gap-6 min-h-[20rem]" to="itinerary">
      {itineraryDays}
    </div>
  );
};

export default Carousel;
