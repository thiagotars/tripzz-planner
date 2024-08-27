import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthProvider"; // Import the custom hook
import SearchPlace from "../components/SearchPlace";
import UserTrips from "../components/UserTrips";
import api from "../utils/api";

const UserPage = () => {
  const { user, setUser, token } = useAuth(); // Use the custom hook to access context
  console.log(user);
  // const { userId } = useParams();
  const [userTrips, setUserTrips] = useState({ allTrips: [] });

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/api/v1/user/${user._id}`);
      console.log(response.data);
      const userData = response.data;
      setUser(userData); // Set user context with fetched data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserTrips = async () => {
    try {
      const response = await api.get("/api/v1/trips");

      const data = response.data;
      setUserTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on initial component mount
    fetchUserTrips(); // Fetch trips on initial component mount
  }, []); // Empty dependency array to run effect once on mount

  const handleTripDeleted = async () => {
    await fetchUserTrips(); // Refetch trips after deletion
  };

  return (
    <>
      <div className="absolute top-0 w-screen h-[484px] bg-light-grey -z-10"></div>
      <SearchPlace fetchUserTrips={fetchUserTrips} />
      {userTrips && (
        <UserTrips
          userTrips={userTrips}
          userId={user.id}
          onTripDeleted={handleTripDeleted}
        />
      )}
    </>
  );
};

export default UserPage;
