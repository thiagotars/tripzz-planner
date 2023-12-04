const AddNewPlace = () => {
  return (
    <div className="mt-10">
      {/* <h6 className="font-bold">+ Add new place</h6> */}
      <div className="flex justify-end mt-4">
        <input
          className="rounded-full bg-light-grey px-6 py-2 text-[.875em]"
          type="text"
          name=""
          id=""
          placeholder="Search place here"
        />
        <button className="bg-black ml-6 text-[.875em] font-bold text-white px-8 rounded-full hover:bg-very-dark-grey">
          Add Place
        </button>
      </div>
    </div>
  );
};

export default AddNewPlace;
