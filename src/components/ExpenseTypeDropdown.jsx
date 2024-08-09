import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ExpenseTypeDropdown = ({ selectedType, onTypeChange }) => {
  const types = [
    { type: "Food", icon: "" },
    { type: "Activities", icon: "" },
    { type: "Shopping", icon: "" },
    { type: "Transport", icon: "" },
    { type: "Hotel", icon: "" },
    { type: "Other", icon: "" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative flex w-1/2 bg-white rounded-full"
      ref={dropdownRef}
    >
      <button
        className="flex items-center justify-between w-full px-6 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="text-[14px] text-dark-grey">{selectedType.type}</h3>
        {isOpen ? (
          <FaChevronUp className="w-3" />
        ) : (
          <FaChevronDown className="w-3" />
        )}
      </button>
      <div
        className={`absolute top-12 flex-col gap-1 ${
          isOpen ? "flex" : "hidden"
        } w-full px-5 py-2 bg-white rounded-3xl drop-shadow-lg`}
      >
        {types.map((item, key) => (
          <h3
            className="text-[14px] my-1 text-dark-grey hover:text-black cursor-pointer"
            key={key}
            onClick={() => {
              onTypeChange(item); // Pass the entire type object to the parent
              setIsOpen(false);
            }}
          >
            {item.type}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTypeDropdown;
