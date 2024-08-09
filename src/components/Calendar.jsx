import dayjs from "dayjs";
import { generateDate, months } from "../utils/calendar";
import { cn } from "../utils/cn";
import React, { useState, useEffect, useRef } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Calendar({
  onDateSelect,
  date,
  setIsStartDateOpen,
  setIsEndDateOpen,
  newTrip,
}) {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(date ? date : currentDate);
  const [selectedDate, setSelectedDate] = useState(date ? date : currentDate);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        // Clicked outside the calendar, close it
        setIsStartDateOpen(false);
        setIsEndDateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsStartDateOpen, setIsEndDateOpen]);

  const handleDateSelect = (date) => {
    onDateSelect(date); // Call parent's callback function with selected date
    setSelectedDate(date);
    setIsStartDateOpen(false);
    setIsEndDateOpen(false);
  };

  const startOfMonth = today.startOf("month").day();
  const daysInMonth = today.daysInMonth();
  const dates = [];

  // Fill in the blanks before the first day of the month
  for (let i = 0; i < startOfMonth; i++) {
    dates.push(null);
  }

  // Fill in the days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(dayjs(new Date(today.year(), today.month(), i)));
  }

  // Determine start and end dates for highlighting range
  const startDate = newTrip.startDate ? dayjs(newTrip.startDate) : null;
  const endDate = newTrip.endDate ? dayjs(newTrip.endDate) : null;

  return (
    <div
      ref={calendarRef}
      className="z-10 absolute bg-white flex top-14 bg-light-grey rounded-[1.25rem] items-center w-full justify-center drop-shadow-md"
    >
      <div className="w-full p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[.875em] font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="md:gap-5 flex items-center gap-3">
            <GrFormPrevious
              className="h-6 w-6 cursor-pointer"
              onClick={() => setToday(today.subtract(1, "month"))}
            />
            <h1
              className="text-[.875em] cursor-pointer"
              onClick={() => {
                setToday(currentDate);
                setSelectedDate(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="h-6 w-6 cursor-pointer"
              onClick={() => setToday(today.add(1, "month"))}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-7 mt-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="h-12 grid place-content-center text-[.875em]"
            >
              <h1 className="text-very-dark-grey">{day}</h1>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-7">
          {dates.map((date, index) => {
            const isSelected =
              date && selectedDate && date.isSame(selectedDate, "day");
            const isStartDate =
              date && startDate && date.isSame(startDate, "day");
            const isEndDate = date && endDate && date.isSame(endDate, "day");
            const isWithinRange =
              startDate &&
              endDate &&
              date &&
              date.isAfter(startDate) &&
              date.isBefore(endDate);

            return (
              <div
                key={index}
                className="h-12 border-t grid place-content-center text-[.875em]"
              >
                <h1
                  className={cn(
                    !date ? "text-very-dark-grey" : "",
                    isSelected
                      ? "border border-very-dark-grey text-very-dark-grey"
                      : "",
                    isStartDate || isEndDate
                      ? "bg-very-dark-grey text-white"
                      : "",
                    isWithinRange ? "bg-very-dark-grey text-white" : "",
                    "h-8 w-8 rounded-full grid place-content-center hover:bg-dark-grey hover:text-white transition-all cursor-pointer"
                  )}
                  onClick={() => date && handleDateSelect(date)}
                >
                  {date ? date.date() : ""}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
