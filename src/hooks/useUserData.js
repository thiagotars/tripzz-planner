import { useState, useEffect } from "react";

const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/v1/user/${userId}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        const data = await response.json(); // Parse response data as JSON
        console.log("User data:", data); // Log parsed response data
        setUserData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { userData, loading, error };
};

export default useUserData;
