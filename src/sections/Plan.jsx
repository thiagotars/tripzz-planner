const Plan = () => {
  return (
    <section className="2xl:px-[280px] xl:px-[200px] sm:px-[80px] px-6 mt-14 pb-[120px]">
      <main className="2xl:mx-20 lg:p-14 mx-0 md:text-start text-center p-10 bg-medium-grey rounded-[25px]">
        <h2 className="lg:text-[2em] sm:text-[1.5em] text-[1.25em] font-bold">
          Plan your next trip now!
        </h2>
        <div className="flex md:flex-row flex-col md:items-end items-center">
          <div className="flex gap-6 mt-10">
            <input
              type="text"
              placeholder="Where to? e.g. Barcelona"
              className="2xl:text-[1em] text-[.875em] w-full mt-2 py-3 px-6 rounded-full text-dark-grey"
            />
            <input
              type="text"
              placeholder="Start date"
              className="w-[132px] rounded-full 2xl:text-[1em] text-[.875em] mt-2 py-3 px-6 text-dark-grey"
            />
            <input
              type="text"
              placeholder="End date"
              className="w-[132px] rounded-full 2xl:text-[1em] text-[.875em] mt-2 py-3 px-6 text-dark-grey"
            />
          </div>

          <button className="lg:text-[1em] md:mt-0 mt-6 ml-12 text-[.875em] bg-dark-grey p-3 px-12 h-[48px] rounded-full text-white font-bold hover:bg-black">
            Start trip
          </button>
        </div>
      </main>
    </section>
  );
};

export default Plan;
