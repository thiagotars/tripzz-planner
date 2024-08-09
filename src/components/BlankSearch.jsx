import React from "react";

const BlankSearch = () => {
  return (
    <div className="flex flex-col px-16 pt-16 pb-7 mx-auto mt-[240px] mb-[160px] h-[424px] w-full max-w-[800px] rounded-[25px] -bottom-[104px] bg-white shadow-md">
      <h2 className="text-[30px] font-bold mb-10">Plan your next trip</h2>
      <div className="flex flex-col justify-between h-full">
        <div className="">
          <input
            type="text"
            placeholder="Where to? e.g. Barcelona"
            className="py-3 px-6 bg-light-grey rounded-full"
          />
          <div className="flex gap-4 mt-8">
            <input
              className="py-3 px-6 bg-light-grey rounded-full"
              type="date"
            />
            <input
              className="py-3 px-6 bg-light-grey rounded-full"
              type="date"
            />
          </div>
        </div>
        <div className="flex justify-between items-center pt-7 border-t border-medium-grey">
          <button className="font-bold hover:text-blue-800">
            + invite people to your trip
          </button>

          <button className="bg-dark-grey p-3 w-[160px] h-[48px] rounded-full text-white font-bold">
            Letzz Go!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlankSearch;
