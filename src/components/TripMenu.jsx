import { FaDollarSign, FaGlobe, FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React, { useRef } from "react";

const TripMenu = () => {
  const sectionRef = useRef();

  const handleClick = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="flex justify-center px-2 sm:px-0 sm:pt-20 pt-12 mb-12 sm:mb-20 items-center pb-12 bg-light-grey"
      ref={sectionRef}
    >
      <div className="bg-white px-2 flex rounded-full items-center sm:text-[1em] text-[0.875em]">
        <NavLink
          onClick={handleClick}
          to="overview"
          className={({ isActive }) =>
            isActive
              ? "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] text-very-dark-grey"
              : "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] hover:text-dark-grey text-medium-grey"
          }
        >
          {/* <FaGlobe className="sm:w-5 w-4 sm:h-5 h-4" /> */}
          <p className="">Overview</p>
        </NavLink>
        <div className="h-10 border-l"></div>
        <NavLink
          onClick={handleClick}
          to="lists"
          className={({ isActive }) =>
            isActive
              ? "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] text-very-dark-grey"
              : "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] hover:text-dark-grey text-medium-grey"
          }
        >
          {/* <FaListUl className="sm:w-5 w-4 sm:h-5 h-4" /> */}
          <p className="">Places</p>
        </NavLink>
        <div className="h-10 border-l"></div>
        <NavLink
          onClick={handleClick}
          to="itinerary"
          className={({ isActive }) =>
            isActive
              ? "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] text-very-dark-grey"
              : "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] hover:text-dark-grey text-medium-grey"
          }
        >
          {/* <FaGlobe className="sm:w-5 w-4 sm:h-5 h-4" /> */}
          <p className="">Itinerary</p>
        </NavLink>
        <div className="h-10 border-l"></div>
        <NavLink
          onClick={handleClick}
          to="budget"
          className={({ isActive }) =>
            isActive
              ? "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] text-very-dark-grey"
              : "py-3 flex flex-col items-center gap-2 w-[5rem] xs:w-[6rem] sm:w-[9rem] hover:text-dark-grey text-medium-grey"
          }
        >
          {/* <FaDollarSign className="sm:w-5 w-4 sm:h-5 h-4" /> */}
          <p className="">Budget</p>
        </NavLink>
      </div>
    </div>
  );
};

export default TripMenu;
