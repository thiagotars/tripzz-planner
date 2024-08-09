import { FiMenu } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import React from "react";

const LoggedOutMenu = ({ loginClick, signupClick }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuRef = useRef();
  const hamburgerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOpen(false); // Close menu if screen width exceeds breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (!menuRef.current.contains(event.target)) {
  //         setIsMobileOpen(false);
  //       }
  //     };

  //     window.addEventListener("click", handleClickOutside);

  //     return () => window.removeEventListener("click", handleClickOutside);
  //   }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  //   if (isMobileOpen) {
  //     window.addEventListener("click", (e) => {
  //       if (e.target !== menuRef.current && e.target !== hamburgerRef.current) {
  //         setIsMobileOpen(false);
  //       }
  //     });
  //   }
  return (
    <div className="relative">
      <button
        ref={hamburgerRef}
        className="md:hidden flex w-8 h-8 text-dark-grey cursor-pointer"
        onClick={() => toggleMobileMenu()}
      >
        <FiMenu className="w-full h-full" />
      </button>

      <div
        className={`md:flex md:flex-row md:static md:bg-transparent md:p-0 md:rounded-none flex flex-col absolute top-16 px-8 py-10 right-0 w-[15rem] bg-white rounded-[1.125rem] ${
          !isMobileOpen && "hidden"
        } items-center`}
        ref={menuRef}
      >
        <button
          className="md:w-[112px] w-full h-10 rounded-full bg-transparent font-semibold text-[.75em] text-very-dark-grey border border-very-dark-grey hover:text-white hover:bg-very-dark-grey hover:border-none"
          onClick={loginClick}
        >
          Log in
        </button>
        <button
          className="md:ml-3 md:mt-0 mt-6 ml-0 md:w-[112px] w-full h-10 rounded-full bg-very-dark-grey font-semibold text-[.75em] text-white hover:bg-dark-grey"
          onClick={signupClick}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoggedOutMenu;
