import React from "react";

const DateCalendar = ({ date }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <button className="flex items-start h-14 bg-white rounded-lg text-very-dark-grey">
      <div className="flex flex-col justify-center w-14 h-full rounded-lg ">
        {date && (
          <>
            <h1 className="text-center sm:text-[.875em] text-[.75em] font-semibold">
              {date.getUTCDate() + getOrdinalSuffix(date.getUTCDate())}
            </h1>
            <div className="flex justify-center gap-1 items-center text-[.675em]">
              <p>{months[date.getMonth()]}</p>
              <p>{date.getFullYear()}</p>
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default DateCalendar;
