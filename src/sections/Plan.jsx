import { FaRegCalendar } from "react-icons/fa6";
import React, { useState } from "react";
import Calendar from "../components/Calendar";

const Plan = () => {
  const [tripInfo, setTripInfo] = useState({
    city: "",
    startDate: "",
    endDate: "",
  });

  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const handleStartDateClick = () => {
    setIsEndDateOpen(false);
    setIsStartDateOpen(!isStartDateOpen);
  };
  const handleEndDateClick = () => {
    setIsStartDateOpen(false);
    setIsEndDateOpen(!isEndDateOpen);
  };

  const handleStartDateSelect = (date) => {
    setTripInfo({ ...tripInfo, startDate: date });
    setIsStartDateOpen(false);
  };

  const handleEndDateSelect = (date) => {
    setTripInfo({ ...tripInfo, endDate: date });
    setIsEndDateOpen(false);
  };

  const setFormattedDate = (date) => {
    const { $D, $M, $y } = date; // Extract desired properties
    const formattedDate = `${$D}-${$M + 1}-${$y}`; // Add 1 to M as months are zero-indexed
    return formattedDate;
  };

  return (
    <section className="2xl:px-[280px] xl:px-[200px] sm:px-[80px] md:pb-16 md:mt-14 sm:mt-8 mt-0 pb-10 px-6">
      <main className="2xl:mx-20 lg:p-14 mx-0 md:text-start text-center lg:px-20 sm:p-10 py-12 px-6 bg-medium-grey rounded-[25px]">
        <h2 className="lg:text-[1.75em] sm:text-[1.5em] text-[1.25em] font-bold">
          Plan your next trip now!
        </h2>
        <div className="sm:items-start flex flex-col justify-between items-center mt-10 text-[14px]">
          <div className="md:flex-row md:items-center flex flex-col items-start gap-4 w-full">
            <input
              type="text"
              onChange={(event) =>
                setTripInfo({ ...tripInfo, city: event.target.value })
              }
              placeholder="Where to? e.g. Barcelona"
              className="2xl:text-[1em] md:w-1/2 xs:px-6 text-[.875em] w-full py-3 px-4 rounded-full text-dark-grey"
            />
            <div className="relative md:w-1/2 sm:min-w-[320px] w-full flex bg-white rounded-full">
              <button
                onClick={handleStartDateClick}
                className={`${
                  isStartDateOpen
                    ? "text-red-600"
                    : "text-dark-grey hover:text-black"
                }xs:px-6 w-1/2 flex items-center justify-between py-3 px-4`}
              >
                <p className="2xl:text-[1em] text-[.875em]">
                  {tripInfo.startDate
                    ? `${setFormattedDate(tripInfo.startDate)}`
                    : "Start Date"}
                </p>
                <FaRegCalendar />
              </button>

              <button
                onClick={handleEndDateClick}
                className={`${
                  isEndDateOpen
                    ? "text-red-600"
                    : "text-dark-grey hover:text-black"
                }xs:px-6 w-1/2 flex items-center justify-between py-3 px-4 border-l`}
              >
                <p className="2xl:text-[1em] text-[.875em]">
                  {tripInfo.endDate
                    ? `${setFormattedDate(tripInfo.endDate)}`
                    : "End Date"}
                </p>
                <FaRegCalendar />
              </button>
              {isStartDateOpen && (
                <Calendar
                  onDateSelect={handleStartDateSelect}
                  date={tripInfo.startDate}
                />
              )}
              {isEndDateOpen && (
                <Calendar
                  onDateSelect={handleEndDateSelect}
                  date={tripInfo.endDate}
                />
              )}
            </div>
          </div>
          <button className="bg-dark-grey py-3 px-4 rounded-full text-white font-bold md:mt-8 mt-6 w-[200px] hover:bg-black">
            Letzz Go!
          </button>
        </div>
      </main>
    </section>
  );
};

export default Plan;
