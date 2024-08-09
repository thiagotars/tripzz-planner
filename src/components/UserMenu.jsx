import React, { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { useAuth } from "../AuthProvider";

const UserMenu = ({ logged, logout }) => {
  const menuRef = useRef();
  const imageRef = useRef();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  console.log(user);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  if (isOpen) {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== imageRef.current) {
        setIsOpen(false);
      }
    });
  }
  // console.log(user);
  return (
    <div className="relative flex items-center">
      <div className="flex items-center">
        <p className="sm:flex hidden font-semibold text-[.75em] text-very-dark-grey">
          <span className="font-normal mr-1">Welcome,</span> {user.name}
        </p>
        <button
          ref={imageRef}
          className="w-8 h-8 bg-user bg-contain ml-6 rounded-full hover:shadow-lg"
          onClick={toggleMenu}
        ></button>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute shadow-xl flex justify-center top-16 p-8 right-0 w-[15rem] bg-white rounded-[1.125rem]`}
        >
          <div className="user-menu flex flex-col text-[.75em] w-full text-start gap-4">
            <Link
              className="py-3 px-8 rounded-full cursor-pointer hover:bg-light-grey"
              to={`user/${user._id}`}
            >
              <div className="flex items-center justify-start">
                <IoHomeOutline />
                <button className="text-[.875em] ml-2">Your Tripzz</button>
              </div>
            </Link>
            <Link
              className="py-3 px-8  rounded-full cursor-pointer hover:bg-light-grey"
              to="/user/settings"
            >
              <div className="flex items-center justify-start">
                <IoSettingsOutline />
                <button className="text-[.875em] ml-2">Settings</button>
              </div>
            </Link>
            <button
              onClick={logout}
              className="py-3 px-8  bg-very-dark-grey rounded-full text-white cursor-pointer hover:bg-black"
            >
              <div className="flex items-center justify-start">
                <IoLogOutOutline />
                <p className="text-[.875em] ml-2">Log out</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
