import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

const UserLayout = () => {
  const { userId } = useParams();

  // console.log(userId);
  return (
    <>
      <Outlet context={{ userId }} />
    </>
  );
};

export default UserLayout;
