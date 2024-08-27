import { NavLink } from "react-router-dom";
import React, { useRef } from "react";

const TripMenu = () => {
  const sectionRef = useRef();
  const menuItems = [
    {
      title: "Overview",
      path: "overview",
    },
    {
      title: "Places",
      path: "lists",
    },
    {
      title: "Itinerary",
      path: "itinerary",
    },
    {
      title: "Budget",
      path: "budget",
    },
  ];

  const handleClick = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="flex justify-center px-2 sm:px-0 sm:pt-20 pt-12 mb-12 sm:mb-20 items-center pb-12 bg-light-grey"
      ref={sectionRef}
    >
      <div className="bg-white px-2 flex rounded-full items-center sm:text-[1em] text-[0.815em]">
        {menuItems.map((item, index) => {
          return (
            <>
              <NavLink
                onClick={handleClick}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "py-3 flex flex-col items-center gap-2 w-[4.5rem] xs:w-[5.5rem] sm:w-[9rem] text-very-dark-grey font-semibold"
                    : "py-3 flex flex-col items-center gap-2 w-[4.5rem] xs:w-[5.5rem] sm:w-[9rem] hover:text-dark-grey text-medium-grey"
                }
              >
                {/* <FaGlobe className="sm:w-5 w-4 sm:h-5 h-4" /> */}
                <p className="text-[.875em]">{item.title}</p>
              </NavLink>
              {index !== menuItems.length - 1 && (
                <div className="h-10 border-l"></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TripMenu;
