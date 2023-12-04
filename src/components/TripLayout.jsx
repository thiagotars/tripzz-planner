import TripSummary from "./TripSummary";
import TripMenu from "./TripMenu";
import { Outlet } from "react-router-dom";

const TripLayout = () => {
  return (
    <>
      {/* <div className="absolute top-0 w-screen h-[520px] bg-medium-grey -z-10"></div> */}
      <TripSummary />
      <TripMenu />

      <div className="flex justify-center">
        <Outlet />
      </div>
    </>
  );
};

export default TripLayout;
