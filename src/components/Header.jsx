import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";
import LoggedOutMenu from "./LoggedOutMenu";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignupContainer, setShowSignupContainer] = useState(false);
  const [showLoginContainer, setShowLoginContainer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignClick = () => {
    setShowLoginContainer(false);
    // setIsMobileOpen(false);
    setShowSignupContainer((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    setShowSignupContainer(false);
    // setIsMobileOpen(false);
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
        "bg-white/90 backdrop-blur-sm shadow transition-all duration-300"
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
          <UserMenu logged={isLoggedIn} logout={() => handleLogoutClick()} />
        ) : (
          <LoggedOutMenu
            logged={isLoggedIn}
            loginClick={() => handleLoginClick()}
            signupClick={() => handleSignClick()}
          />
        )}

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
