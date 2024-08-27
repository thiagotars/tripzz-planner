import { createPortal } from "react-dom";
import { FaXmark, FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import React from "react";
import api from "../utils/api";

const LoginModal = ({ isOpen, onClose, changeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser, setToken, user } = useAuth();

  if (redirect && user) {
    return <Navigate to={`/user/${user._id}`} />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/api/v1/auth/login", {
        email,
        password,
      });

      setToken(data.token);
      setUser(data.user);
      setRedirect(true);
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred during login.");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
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
        <h3 className="font-semibold">Log in to tripzz</h3>
        <div className="mt-8 text-[.875em]">
          <form onSubmit={handleSubmit}>
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
            {error && (
              <div className="text-red-600 text-[.75em] mt-2">{error}</div>
            )}
            <div className="flex flex-col mt-4 items-center">
              <button
                type="submit"
                className="font-semibold text-[.875em] py-3 px-8 rounded-full hover:bg-light-grey"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin w-5 h-5" />
                ) : (
                  "Log in with email"
                )}
              </button>
              <button
                className="text-[.8em] mt-6 hover:font-semibold"
                onClick={changeModal}
              >
                Don't have an account yet?{" "}
                <span className="font-semibold">Sign up</span>
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
