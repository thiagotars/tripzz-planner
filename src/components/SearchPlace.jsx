import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const SearchPlace = () => {
  return (
    <>
      <div className="flex flex-col justify-between px-16 pt-16 pb-9 mx-auto mt-[200px] mb-[200px] w-full max-w-[800px]">
        <h2 className="text-[28px] pb-2 border-b font-bold text-white">
          Plan your next trip
        </h2>
        <div className="flex justify-between mt-8 text-[14px]">
          <div>
            <input
              className="py-3 px-4 rounded-full max-w-[200px]"
              type="text"
              placeholder="e.g 'Barcelona'"
            />
            <input
              className="py-3 px-4 rounded-full max-w-[104px] ml-4 text-center"
              type="text"
              placeholder="Start Date"
            />
            <input
              className="py-3 px-4 rounded-full max-w-[104px] ml-4 text-center"
              type="text"
              placeholder="End Date"
            />
          </div>
          <button className="bg-black py-3 px-4 rounded-full text-white min-w-[160px] font-bold">
            Letzz Go!
          </button>
        </div>
      </div>
      <div className="max-w-[800px] px-16 mx-auto mb-16">
        <h2 className="text-[28px] font-bold">Upcoming Tripzz</h2>
        <Link to="trip" className="flex rounded-[20px] border mt-8 h-24">
          <div className="min-w-[160px] h-full bg-cover bg-center bg-barcelona rounded-[20px]"></div>
          <div className="flex justify-between w-full px-8">
            <div className="flex flex-col justify-center py-auto">
              <h3 className="font-bold text-[.875em]">Barcelona - Spain</h3>
              <p className="text-[14px] mt-1">24th-27th, July 2024</p>
            </div>
            <div className="flex">
              <button className="flex justify-center items-center">
                <FaRegEdit className="w-[1.25rem] h-[1.25rem] ml-[2px] mb-[2px] text-dark-grey" />
              </button>
              <button className="flex justify-center items-center ml-8">
                <FaRegTrashAlt className="w-[1.25rem] h-[1.25rem] mb-[2px] text-dark-grey" />
              </button>
            </div>
          </div>
        </Link>
        <div className="flex rounded-[20px] border mt-8 h-24">
          <div className="min-w-[160px] h-full bg-cover bg-center bg-paraty rounded-[20px]"></div>
          <div className="flex justify-between w-full px-8">
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-[.875em]">Paraty - Brasil</h3>
              <p className="text-[14px] mt-1">14th-19th, August 2024</p>
            </div>
            <div className="flex">
              <button className="flex justify-center items-center">
                <FaRegEdit className="w-[1.25rem] h-[1.25rem] ml-[2px] mb-[2px] text-dark-grey" />
              </button>
              <button className="flex justify-center items-center ml-8">
                <FaRegTrashAlt className="w-[1.25rem] h-[1.25rem] mb-[2px] text-dark-grey" />
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-[28px] font-bold mt-20">Past Tripzz</h2>
        <div className="flex rounded-[20px] border mt-8 h-24">
          <div className="min-w-[160px] h-full bg-cover bg-center bg-amsterdam rounded-[20px]"></div>
          <div className="flex justify-between w-full px-8">
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-[.875em]">
                Amsterdam - Netherlands
              </h3>
              <p className="text-[14px] mt-1">24th-27th, July 2023</p>
            </div>
            <div className="flex">
              <button className="flex justify-center items-center">
                <FaRegEdit className="w-[1.25rem] h-[1.25rem] ml-[2px] mb-[2px] text-dark-grey" />
              </button>
              <button className="flex justify-center items-center ml-8">
                <FaRegTrashAlt className="w-[1.25rem] h-[1.25rem] mb-[2px] text-dark-grey" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex rounded-[20px] border mt-8 h-24">
          <div className="min-w-[160px] h-full bg-cover bg-center bg-sicilia rounded-[20px]"></div>
          <div className="flex justify-between w-full px-8">
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-[.875em]">Sicily - Italy</h3>
              <p className="text-[14px] mt-1">14th-19th, August 2023</p>
            </div>
            <div className="flex">
              <button className="flex justify-center items-center">
                <FaRegEdit className="w-[1.25rem] h-[1.25rem] ml-[2px] mb-[2px] text-dark-grey" />
              </button>
              <button className="flex justify-center items-center ml-8">
                <FaRegTrashAlt className="w-[1.25rem] h-[1.25rem] mb-[2px] text-dark-grey" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPlace;
