import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setIsOpenMenu(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  return (
    <header className="z-10 absolute top-0 w-screen flex justify-center pt-8 md:px-20 px-8">
      <nav className="flex max-w-[1400px] w-full justify-between text-[20px] items-center ">
        {/* LOGO */}
        <Link className="flex items-center cursor-pointer" to="/">
          <div className="w-10 h-8 bg-logo bg-cover"></div>
          <h4 className="font-bold tracking-wider ml-3 text-dark-grey text-[16px]">
            tripzz
          </h4>
        </Link>
        {/* BUTTONS */}

        {isLoggedIn ? (
          <div className="relative flex items-center">
            <div className="flex items-center">
              <p className="font-semibold text-[14px] text-dark-grey">
                <span className="font-normal mr-1">Welcome,</span> User
              </p>
              <button
                className="w-10 h-10 bg-user bg-contain ml-6"
                onClick={handleMenuClick}
              ></button>
            </div>
            {isOpenMenu && (
              <div className="absolute flex justify-center top-16 p-8 right-0 w-[15rem] bg-white rounded-[1.125rem]">
                <div className="flex flex-col text-[.75em] w-full text-center gap-6">
                  <Link
                    className="py-3 rounded-[1.125rem] cursor-pointer"
                    to="user"
                    onClick={handleMenuClick}
                  >
                    Your Tripzz
                  </Link>
                  <button
                    className="py-3 bg-very-dark-grey rounded-[1.125rem] text-white cursor-pointer"
                    onClick={handleLogoutClick}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="md:flex hidden items-center">
            <button
              className="w-[112px] h-10 rounded-full bg-medium-grey font-semibold text-[14px] text-dark-grey"
              onClick={handleLoginClick}
            >
              Log in
            </button>
            <button className="w-[112px] h-10 rounded-full bg-dark-grey ml-3 font-semibold text-[14px] text-white">
              Sign in
            </button>
          </div>
        )}
        <FiMenu
          className="md:hidden w-8 h-8 text-dark-grey cursor-pointer"
          onClick={handleMenuClick}
        />
      </nav>
    </header>
  );
};

export default Header;
