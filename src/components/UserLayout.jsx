import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <div className="absolute top-0 w-screen h-[520px] bg-medium-grey -z-10"></div>
      <Outlet />
    </>
  );
};

export default UserLayout;
