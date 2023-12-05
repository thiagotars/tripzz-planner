import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignupContainer, setShowSignupContainer] = useState(false);
  const [showLoginContainer, setShowLoginContainer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = () => {
    setIsOpenMenu((prev) => !prev);
  };
  const handleSignClick = () => {
    setShowLoginContainer(false);
    setShowSignupContainer((prev) => !prev);
  };
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setIsOpenMenu(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    setShowSignupContainer(false);
    setShowLoginContainer((prev) => !prev);
  };

  const handleLog = () => {
    setIsLoggedIn(true);
    setShowLoginContainer((prev) => !prev);
    navigate("/user");
  };

  return (
    <header
      className={`bg-medium-grey sticky z-30 top-0 w-screen flex justify-center py-4 md:px-20 px-8 ${
        isScrolled &&
        "bg-white/80 backdrop-blur-sm shadow transition-all duration-300"
      }`}
    >
      <nav className="flex max-w-[1120px] w-full justify-between text-[20px] items-center ">
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
                className="w-10 h-10 bg-user bg-contain ml-6 rounded-full hover:shadow-lg"
                onClick={handleMenuClick}
              ></button>
            </div>
            {isOpenMenu && (
              <div className="absolute shadow-xl flex justify-center top-16 p-8 right-0 w-[15rem] bg-white rounded-[1.125rem]">
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
              className="w-[112px] h-10 rounded-full bg-transparent font-semibold text-[14px] text-dark-grey  border border-dark-grey hover:text-black hover:border-black"
              onClick={handleLoginClick}
            >
              Log in
            </button>
            <button
              className="w-[112px] h-10 rounded-full bg-dark-grey ml-3 font-semibold text-[14px] text-white hover:bg-black"
              onClick={handleSignClick}
            >
              Sign in
            </button>
          </div>
        )}
        <FiMenu
          className="md:hidden w-8 h-8 text-dark-grey cursor-pointer"
          onClick={handleMenuClick}
        />
        <LoginModal
          isOpen={showLoginContainer}
          changeModal={() => handleSignClick()}
          onClose={() => setShowLoginContainer(false)}
          onLogin={() => handleLog()}
        />
        <SignupModal
          isOpen={showSignupContainer}
          changeModal={() => handleLoginClick()}
          onClose={() => setShowSignupContainer(false)}
        />
      </nav>
    </header>
  );
};

export default Header;
