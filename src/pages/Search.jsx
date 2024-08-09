import PopularDestinies from "../components/PopularDestinies";
// import BlankSearch from "../components/BlankSearch";
import React from "react";

const Search = () => {
  return (
    <>
      <div className="absolute top-0 w-screen h-[560px] bg-medium-grey -z-10"></div>

      <BlankSearch />
      <PopularDestinies />
    </>
  );
};

export default Search;
