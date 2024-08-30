import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import TripLayout from "./components/TripLayout";
import Overview from "./pages/Trip/Overview";
import Itinerary from "./pages/Trip/Itinerary";
import Lists from "./pages/Trip/Lists";
import Notes from "./pages/Trip/Notes";
import Budget from "./pages/Trip/Budget";
import UserLayout from "./components/UserLayout";
import UserPage from "./pages/UserPage";
import UserSettings from "./pages/UserSettings";
import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import api from "./utils/api";

function App() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/api/v1/me")
        .then((response) => {
          setUser({
            ...response.data.user,
            token,
          });
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, [setUser]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route
          path="user/:userId"
          element={user ? <UserLayout /> : <Navigate to="/" replace />}
        >
          <Route index element={<UserPage />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="trips/:tripId" element={<TripLayout />}>
            <Route path="overview" element={<Overview />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="lists" element={<Lists />} />
            <Route path="notes" element={<Notes />} />
            <Route path="budget" element={<Budget />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
