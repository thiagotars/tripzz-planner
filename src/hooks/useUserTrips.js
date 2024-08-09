import { useState, useEffect } from "react";

const useUserTrips = () => {
  const [userTrips, setUserTrips] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError(new Error("No token found"));
          return;
        }

        const response = await fetch("/api/v1/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        const data = await response.json(); // Parse response data as JSON
        console.log("User trips:", data); // Log parsed response data
        setUserTrips(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, []);

  return { userTrips, loading, error };
};

export default useUserTrips;
