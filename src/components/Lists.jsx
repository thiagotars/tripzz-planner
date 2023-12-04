import { FaStar, FaCircle, FaPlus } from "react-icons/fa";

const Lists = (listData) => {
  const lists = listData.listData;
  console.log(lists);

  const allLists = lists.map((list) => {
    const allItems = list.items.map((item) => {
      return (
        <li
          key={item.id}
          className="flex h-[7.5rem] w-full rounded-[1.25rem] border"
        >
          <div className="w-full px-6 py-4">
            <div className="flex justify-between">
              <h6 className="font-bold text-[.875em]">
                <span className="font-normal">@ </span>
                {item.name}
              </h6>
              <div className="flex items-center text-[.75em] gap-3 text-dark-grey">
                <p>{item.type}</p>
                <p>|</p>
                <div className="flex gap-1 items-center">
                  <p>{item.rating}</p>
                  <FaStar />
                </div>
                {item.price && (
                  <div className="flex gap-3">
                    <p>|</p>
                    <p>$$$</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`min-w-[11rem] h-full rounded-[1.25rem] ${item.image} bg-cover bg-no-repeat bg-center`}
          ></div>
        </li>
      );
    });
    return (
      <div key={list.id}>
        <div className="flex items-center mt-8">
          <FaCircle className="w-[.625rem]" />
          <h5 className="mx-4">{list.title}</h5>
          <hr className="w-full border-t" />
        </div>

        <ul className="flex flex-col gap-4 px-6 mt-6">{allItems}</ul>
        <div className="flex gap-8 mt-10 px-6 h-10 justify-end">
          <input
            className="rounded-full text-[.875em] bg-light-grey px-6 py-2 focus: outline-none"
            type="text"
            name=""
            id=""
            placeholder="e.g. 'Kiosko'"
          />
          <button className="bg-black hover:bg-very-dark-grey w-[7.5rem] text-[.875em] font-bold text-white px-6 rounded-full">
            Add Place
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="pb-10 px-10">
      <div>
        <h2 className="text-[1.25em] font-bold">Your Lists</h2>
        {allLists}
      </div>
      {/* New List */}
      <div className="mt-16">
        <div className="flex items-center font-bold">
          <FaPlus className="w-[.625rem]" />
          <h5 className="mx-4 min-w-[6.5rem]">Add New List</h5>
          <hr className="w-full border-t" />
        </div>
        <div className="flex gap-8 mt-10 px-6 h-10 justify-end">
          <input
            className="rounded-full text-[.875em] bg-light-grey px-6 py-2 focus: outline-none"
            type="text"
            name=""
            id=""
            placeholder="e.g. 'Museums'"
          />
          <button className="bg-black w-[7.5rem] text-[.875em] font-bold text-white px-6 rounded-full hover:bg-very-dark-grey">
            Add List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lists;
