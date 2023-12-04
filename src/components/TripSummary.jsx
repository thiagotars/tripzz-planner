import {
  FaRegEdit,
  FaRegTrashAlt,
  FaUserPlus,
  FaArrowLeft,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { data } from "../data/data";

const TripSummary = () => {
  const tripInfo = data[0].trip.info;
  console.log(tripInfo);

  function transformNumber(number) {
    const million = 1000000;
    const thousand = 1000;

    if (number >= million) {
      return `${number / million} Million People`;
    } else if (number >= thousand) {
      return `${number / thousand} Thousand People`;
    } else {
      return `${number} People`;
    }
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function calculateDaysAndNights(startDate, endDate) {
    // Convert the start and end dates to milliseconds.
    console.log(startDate, endDate);

    // Calculate the difference in milliseconds between the two dates.
    const diff = endDate - startDate;

    // Calculate the number of days by dividing the difference in milliseconds by the number of milliseconds in a day.
    const days = diff / (1000 * 60 * 60 * 24);
    console.log(Math.floor(days), days);
    // Calculate the number of nights by subtracting the number of days from the total number of days.
    const nights = Math.floor(days - (days - Math.floor(days)));

    return { days: Math.ceil(days), nights };
  }

  const { days, nights } = calculateDaysAndNights(
    tripInfo.startDate,
    tripInfo.endDate
  );

  return (
    <div className="flex flex-col justify-between px-16 py-10 mx-auto mt-[120px] mb-16 h-[400px] w-full max-w-[800px] rounded-[25px] bg-white shadow-md">
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-bold">Trip to {tripInfo.city}</h2>
          <button className="flex items-center h-[32px] text-[14px] hover:text-dark-grey">
            <FaArrowLeft />
            <Link to="/user">
              <p className="ml-2">Back to all trips</p>
            </Link>
          </button>
        </div>
        <div className="flex flex-col gap-2 text-[14px] mt-8">
          <h6 className="font-bold">
            Country:
            <span className="font-normal ml-2">{tripInfo.country}</span>
          </h6>
          <h6 className="font-bold">
            Language:
            <span className="font-normal ml-2">{tripInfo.language}</span>
          </h6>
          <h6 className="font-bold">
            Population:
            <span className="font-normal ml-2">
              {transformNumber(tripInfo.population)}
            </span>
          </h6>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between items-center text-[14px]">
          <div className="flex items-center">
            <h6 className="">
              {`${tripInfo.startDate.getUTCDate()} - ${tripInfo.endDate.getUTCDate()}, ${
                months[tripInfo.startDate.getMonth()]
              } ${tripInfo.endDate.getFullYear()}`}
            </h6>
            <button className="ml-4">
              <FaRegEdit className="w-5 h-5 hover:text-dark-grey font-bold" />
            </button>
          </div>
          <p>{`${days} Days - ${nights} Nights`}</p>
        </div>
        <div className="flex justify-between mt-6 pt-6 border-t border-medium-grey">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-user rounded-full bg-cover"></div>
            <FaUserPlus className="w-[24px] h-[24px] ml-4 text-medium-grey cursor-pointer" />
          </div>

          <button className="bg-black text-white rounded-full items-center flex py-3 px-5 text-[.875em] font-bold hover:bg-dark-grey">
            Delete Trip
            <FaRegTrashAlt className="w-4 h-4 ml-2 text-white" />
          </button>

          {/* <div className="flex">
          <button className="flex justify-center items-center">
            <FaRegEdit className="w-[24px] h-[24px] ml-[2px] mb-[2px] text-dark-grey" />
          </button>
          <button className="flex justify-center items-center ml-8">
            <FaRegTrashAlt className="w-[24px] h-[24px] mb-[2px] text-dark-grey" />
          </button>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
