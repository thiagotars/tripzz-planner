import { Link, useOutletContext } from "react-router-dom";
import React from "react";
import Carousel from "../../components/Carousel";
import BudgetSummary from "../../components/BudgetSummary";

const Overview = () => {
  const { tripData, setTripData } = useOutletContext();

  if (!tripData) {
    return <div>Loading...</div>;
  }

  const days = tripData.tripDays || [];
  const lists = tripData.lists || [];
  const places = tripData.places || [];

  const countPlacesInList = (listId) => {
    return places.filter((place) => place.list?._id === listId).length;
  };

  const allListItems = lists.map((list) => {
    const itemCount = countPlacesInList(list._id);
    return (
      <div
        key={list._id}
        className="flex justify-between items-center text-very-dark-grey"
      >
        <p className="text-[0.875em]">{list.name}</p>
        <p className="text-[0.75em] text-dark-grey">
          {itemCount > 0
            ? `${itemCount} ${itemCount > 1 ? "items" : "item"}`
            : "No items"}
        </p>
      </div>
    );
  });

  return (
    <main className="w-[50rem] md:px-0 px-6">
      <div className="">
        {tripData && <BudgetSummary />}
        <div className="flex sm:flex-row flex-col gap-8 w-full mt-12">
          <Carousel days={days} tripData={tripData} />
          <Link
            className="flex flex-col w-full sm:w-1/2 p-6 bg-light-grey rounded-[1.25rem] cursor-pointer"
            to={`/user/${tripData.createdBy}/trips/${tripData._id}/lists`}
          >
            <h4 className="font-semibold text-[1em] text-very-dark-grey">
              Lists
            </h4>
            <div className="flex flex-col mt-6 pb-4 gap-4 overflow-scroll">
              {allListItems.length > 0 ? (
                allListItems
              ) : (
                <p className="text-[0.875em] max-w-[12rem] text-dark-grey">
                  Create lists to organize the places you want to visit by
                  <span className="font-semibold"> clicking here</span>
                </p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Overview;
