import { createPortal } from "react-dom";
import { FaXmark, FaGoogle, FaFacebookF } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import React from "react";
import api from "../utils/api";

const LoginModal = ({ isOpen, onClose, changeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser, setToken, user } = useAuth(); // Access user from useAuth

  // Handle redirection outside of useEffect
  if (redirect && user) {
    return <Navigate to={`/user/${user._id}`} />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/api/v1/auth/login", {
        email,
        password,
      });

      // Set the token and user in AuthProvider
      setToken(data.token);
      setUser(data.user);
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div
        className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className="md:w-[400px] md:p-16 p-12 w-[90%] z-40 fixed flex flex-col justify-center top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] bg-white text-center rounded-[20px]">
        <button
          className="absolute top-[20px] right-[20px] text-[.875em]"
          onClick={onClose}
        >
          <FaXmark className="w-8 h-8 p-2 rounded-full hover:bg-light-grey" />
        </button>
        <h3 className="font-bold">Log in to tripzz</h3>
        <div className="mt-6 text-[.875em]">
          <div className="flex justify-center items-center py-3 rounded-full border text-[.8em] text-white font-bold bg-[#1877F2] hover:bg-[#1864f2] cursor-pointer">
            <FaFacebookF className="w-5 h-5 text-white mr-4" />
            <p>Log in with Facebook</p>
          </div>
          <div className="flex justify-center items-center py-3 rounded-full border text-[.8em] text-dark-grey font-bold mt-2 bg-white hover:bg-light-grey cursor-pointer">
            <FaGoogle className="w-5 h-5 text-dark-grey mr-4" />
            <p>Log in with Gmail</p>
          </div>
          <div className="relative w-full mt-6 border-t">
            <p className="w-[36px] bg-white absolute text-[.75em] text-dark-grey font-bold top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]">
              or
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-5 py-3 border rounded-full text-[.8em]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-5 py-3 border rounded-full text-[.8em] mt-2"
            />
            <div className="flex flex-col mt-4 items-center">
              <button className="font-bold text-[.875em] py-3 px-8 rounded-full hover:bg-light-grey">
                Log in with email
              </button>
              <button className="text-[.7em] mt-4 hover:font-bold">
                Forgot your password?
              </button>
              <button
                className="text-[.8em] mt-4 hover:font-bold"
                onClick={changeModal}
              >
                Don't have an account yet?{" "}
                <span className="font-bold">Sign up</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default LoginModal;
