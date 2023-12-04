import { FaDollarSign, FaGlobe, FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

const TripMenu = () => {
  const sectionRef = useRef();

  const handleClick = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="flex justify-center pt-6 mb-24 items-center"
      ref={sectionRef}
    >
      <NavLink onClick={handleClick}>
        <div className="flex flex-col items-center gap-2 w-[7.5rem] text-dark-grey">
          <FaGlobe className="w-5 h-5" />
          <p className="text-[0.875em]">Overview</p>
        </div>
      </NavLink>
      <div className="h-14 border-l border-medium-grey"></div>
      <NavLink onClick={handleClick} to="itinerary">
        <div className="flex flex-col items-center gap-2 w-[7.5rem] text-dark-grey">
          <div className="h-5 w-6 bg-logo bg-contain bg-center"></div>
          <p className="text-[0.875em]">Itinerary</p>
        </div>
      </NavLink>
      <div className="h-14 border-l border-medium-grey"></div>
      <NavLink onClick={handleClick} to="lists">
        <div className="flex flex-col items-center gap-2 w-[7.5rem] text-dark-grey">
          <FaListUl className="w-5 h-5" />
          <p className="text-[0.875em]">Lists</p>
        </div>
      </NavLink>
      <div className="h-14 border-l border-medium-grey"></div>
      <NavLink onClick={handleClick} to="notes">
        <div className="flex flex-col items-center gap-2 w-[7.5rem] text-dark-grey">
          <FaListUl className="w-5 h-5" />
          <p className="text-[0.875em]">Notes</p>
        </div>
      </NavLink>
      <div className="h-14 border-l border-medium-grey"></div>
      <NavLink onClick={handleClick} to="budget">
        <div className="flex flex-col items-center gap-2 w-[7.5rem] text-dark-grey">
          <FaDollarSign className="w-5 h-5" />
          <p className="text-[0.875em]">Budget</p>
        </div>
      </NavLink>
    </div>
  );
};

export default TripMenu;
