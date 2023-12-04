import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="user" element={<UserLayout />}>
          <Route index element={<UserPage />} />
          <Route path="trip" element={<TripLayout />}>
            <Route index element={<Overview />} />
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
