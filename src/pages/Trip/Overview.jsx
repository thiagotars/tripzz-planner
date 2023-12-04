import { Link } from "react-router-dom";
import PlacesToVisit from "../../components/PlacesToVisit";
import { data } from "../../data/data";
import Carousel from "../../components/Carousel";

const Overview = () => {
  const tripData = data[0].trip;
  const itinerary = tripData.itinerary;
  const budget = tripData.budget;
  const lists = tripData.lists;
  const notes = tripData.notes;

  const totalSpent = budget.expenses.reduce(
    (sum, expense) => sum + expense.value,
    0
  );

  const allListItems = lists.map((list) => {
    return (
      <div key={list.id} className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`w-12 h-12 ${list.items[0].image} bg-cover rounded-full`}
          ></div>
          <p className="ml-4 text-[0.875em]">{list.title}</p>
        </div>
        <p className="text-[0.875em] text-dark-grey">
          {list.items ? list.items.length + " items" : "No items"}
        </p>
      </div>
    );
  });
  return (
    <main className="w-[50rem]">
      <div className="">
        <div className="grid grid-cols-2 grid-flow-col gap-6 w-full">
          <Carousel data={itinerary} />

          <Link
            className="flex flex-col h-[65%] p-6 border rounded-[1.25rem]"
            to="budget"
          >
            <h4 className="font-bold text-[1.25em]">Budget</h4>
            <div className="flex flex-col gap-4 mt-6">
              <div className="w-full flex justify-between items-center">
                <p className="text-[.875em]">Total Spent</p>
                <h1 className="font-bold">
                  <span className="font-normal text-[.875em] mr-2">$</span>
                  {totalSpent.toFixed(2)}
                </h1>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-[.875em]">Your Limit</p>
                <h1 className="font-bold">
                  <span className="font-normal text-[.875em] mr-2">$</span>
                  {budget.limit.toFixed(2)}
                </h1>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-[.875em]">Remaining</p>
                <h1 className="font-bold">
                  <span className="font-normal text-[.875em] mr-2">$</span>
                  {budget.limit.toFixed(2) - totalSpent.toFixed(2)}
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full flex gap-6 mt-6 h-[17.5rem]">
          <Link
            className="w-[50%] p-6 border rounded-[1.25rem] cursor-pointer"
            to="lists"
          >
            <h4 className="font-bold text-[1.25em]">Lists</h4>
            <div className="flex flex-col gap-2 mt-6 h-[80%] pr-2 overflow-scroll">
              {allListItems}
            </div>
          </Link>
          <Link className=" w-[50%] p-6 border rounded-[1.25rem]" to="notes">
            <h4 className="font-bold text-[1.25em]">Notes</h4>
            <div className="mt-6 h-[75%] overflow-scroll">
              <p className="text-[0.875em] mr-2">{notes.content}</p>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 grid-flow-col gap-6 w-full mt-6"></div>
      </div>

      <PlacesToVisit />
    </main>
  );
};

export default Overview;
