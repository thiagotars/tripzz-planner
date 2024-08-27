import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import React from "react";
import Logo from "../assets/Background.svg";

const Footer = () => {
  return (
    <footer className="bg-very-dark-grey py-20 2xl:px-[280px] xl:px-[200px] sm:px-[80px] px-6 mt-28">
      <main className="flex flex-col md:flex-row justify-between items-center text-light-grey">
        <div className="flex items-center w-[120px]">
          <img className="text-white w-8" src={Logo} alt="tripzz-logo" />
          <h4 className="ml-4 font-bold tracking-wider text-[1em]">tripzz</h4>
        </div>
        <div className="md:mt-0 mt-8 flex flex-col text-[.875em] items-center text-center">
          <h6 className="">Just a better way to plan your tripzz</h6>
          <p className="md:flex text-center hidden mt-2 text-[.815em]">
            Copyright @ 2023
          </p>
        </div>
        <div className="md:mt-0 md:w-[120px] mt-10 flex flex-col items-center w-[148px]">
          <h6 className="text-center text-[14px]">Follow us:</h6>
          <div className="flex justify-between gap-5 mt-2">
            <FaInstagram className="text-[18px] cursor-pointer hover:text-black" />
            <FaFacebook className="text-[18px] cursor-pointer hover:text-black" />
            <FaTwitter className="text-[18px] cursor-pointer hover:text-black" />
          </div>
          <p className="md:hidden flex mt-8 text-[.875em]">Copyright @ 2023</p>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
