import React from "react";
import { useOutletContext } from "react-router-dom";

const ListMenu = ({ lists, listFilter, setListFilter }) => {
  const { tripData } = useOutletContext();

  return (
    tripData.places.length > 0 && (
      <div className="mb-8">
        <ul className="flex flex-wrap justify-end gap-2 decoration-none">
          <li>
            <button
              onClick={() => setListFilter("all")}
              className={`text-dark-grey border border-dark-grey py-1 px-3 rounded-full decoration-none text-[.815em] ${
                listFilter === "all" && "bg-very-dark-grey text-light-grey"
              }`}
            >
              all
            </button>
          </li>
          {lists.map((list) => (
            <li key={list._id}>
              <button
                onClick={() => setListFilter(list)}
                className={`text-dark-grey border border-dark-grey py-1 px-3 rounded-full decoration-none text-[.815em] ${
                  list._id === listFilter._id
                    ? "bg-very-dark-grey text-light-grey"
                    : "bg-white"
                }`}
              >
                {list.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default ListMenu;
