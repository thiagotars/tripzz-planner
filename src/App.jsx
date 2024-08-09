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
import axios from "axios";
import { useContext } from "react";
import React from "react";
import { useAuth } from "./AuthProvider";

// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Accept"] = "application/json";
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

function App() {
  const { user } = useAuth(); // Access user from useAuth

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route
          path="user/:userId"
          element={user ? <UserLayout /> : <Navigate to="/" />}
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
