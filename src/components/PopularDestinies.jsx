const PopularDestinies = () => {
  return (
    <section className="2xl:px-[280px] xl:px-[200px] sm:px-[80px] px-6 pt-14 pb-[200px]">
      <main className="2xl:mx-20 mx-0">
        <h2 className="lg:text-[2em] sm:text-[1.5em] text-[1.25em] md:text-start text-center font-bold">
          Popular Destinies
        </h2>
        <div className="flex flex-col md:flex-row md:gap-12 gap-6 justify-between">
          <div className="w-full mt-12">
            <div className="bg-medium-grey h-[250px] rounded-[25px]"></div>
            <div className="flex mt-4 justify-between items-center px-4">
              <h6 className="font-semibold text-[16px]">Paris</h6>
              <p>4.4</p>
            </div>
          </div>
          <div className="w-full mt-12">
            <div className="bg-medium-grey h-[250px] rounded-[25px]"></div>
            <div className="flex mt-4 justify-between items-center px-4">
              <h6 className="font-semibold text-[16px]">Barcelona</h6>
              <p>4.4</p>
            </div>
          </div>
          <div className="w-full mt-12">
            <div className="bg-medium-grey h-[250px] rounded-[25px]"></div>
            <div className="flex mt-4 justify-between items-center px-4">
              <h6 className="font-semibold text-[16px]">London</h6>
              <p>4.4</p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default PopularDestinies;
