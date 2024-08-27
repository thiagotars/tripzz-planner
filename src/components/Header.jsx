import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import { useAuth } from "../AuthProvider";

import Logo from "../assets/Logo.svg";

const Header = () => {
  const { user, login, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignupContainer, setShowSignupContainer] = useState(false);
  const [showLoginContainer, setShowLoginContainer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

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
    setShowSignupContainer((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    navigate("/");
    logout();
    setShowSignupContainer(false);
    setShowLoginContainer(false);
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      setShowSignupContainer(false);
      setShowLoginContainer((prev) => !prev);
    }
  };

  const handleLog = async (credentials) => {
    try {
      await login(credentials);
      setShowLoginContainer((prev) => !prev);
      navigate("/user");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <header
      className={`lg:px-20 md:px-12 sticky z-30 top-0 w-screen flex justify-center py-6 px-6 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-light-grey"
      }`}
    >
      <nav className="flex max-w-[1120px] w-full justify-between text-[20px] items-center ">
        {/* LOGO */}
        <Link className="flex items-center cursor-pointer" to="/">
          <img src={Logo} alt="logo" className="w-10 h-8" />
          <h4 className="font-semibold tracking-wide ml-3 text-very-dark-grey text-[.75em]">
            tripzz
          </h4>
        </Link>
        {/* BUTTONS */}
        {isLoggedIn ? (
          <UserMenu logged={isLoggedIn} logout={handleLogoutClick} />
        ) : (
          <LoggedOutMenu
            logged={isLoggedIn}
            loginClick={handleLoginClick}
            signupClick={handleSignClick}
          />
        )}
      </nav>
      <LoginModal
        isOpen={showLoginContainer}
        changeModal={handleSignClick}
        onClose={() => setShowLoginContainer(false)}
        onLogin={handleLog} // Pass handleLog to handle login
      />
      <SignupModal
        isOpen={showSignupContainer}
        changeModal={handleLoginClick}
        onClose={() => setShowSignupContainer(false)}
      />
    </header>
  );
};

export default Header;
