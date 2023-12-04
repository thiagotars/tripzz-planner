import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ExpenseTypeDropdown = () => {
  const types = [
    { type: "Activities", icon: "" },
    { type: "Food", icon: "" },
    { type: "Transport", icon: "" },
  ];

  const [value, setValue] = useState("Type");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex w-1/4 bg-light-grey rounded-full">
      <button
        className="flex items-center justify-between w-full px-6 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="text-[14px] text-dark-grey">{value}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <div
        className={`absolute top-14 flex-col gap-1 ${
          isOpen ? "flex" : "hidden"
        } w-full px-6 py-2 bg-light-grey rounded-3xl`}
      >
        {isOpen &&
          types.map((item, key) => (
            <h3
              className="text-[14px] my-1 text-dark-grey hover:text-black cursor-pointer"
              key={key}
              onClick={() => {
                setValue(item.type);
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
