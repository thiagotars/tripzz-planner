import React, { useState, useEffect, useRef, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const CurrencyDropdown = ({ selectedCurrency, onCurrencyChange }) => {
  const { user } = useAuth();
  const { tripData, setTripData } = useOutletContext();
  const userCurrency = tripData.destination.currency[0];
  const tripCurrency = user.currency;

  const currencies = [userCurrency, tripCurrency];
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
      className="relative w-1/2 sm:w-auto flex bg-white rounded-full"
      ref={dropdownRef}
    >
      <button
        className="flex items-center justify-between w-full sm:w-[4rem] md:w-[4.5rem] px-4 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="text-[14px] text-dark-grey">
          {selectedCurrency.symbol}
        </h3>
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
        {currencies.map((currency, index) => (
          <h3
            className="text-[14px] my-1 text-dark-grey hover:text-black cursor-pointer"
            key={index}
            onClick={() => {
              onCurrencyChange(currency);
              setIsOpen(false);
            }}
          >
            {currency.symbol}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default CurrencyDropdown;
