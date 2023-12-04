const Hero = () => {
  return (
    <section className="overflow-hidden relative w-screen h-[42rem] bg-medium-grey z-[-2] sm:h-[48rem] xs:h-[44rem]">
      <main className="2xl:px-[17rem] xl:px-[12rem] md:px-20 px-8">
        <div className="flex md:flex-col ml-[400px] object-cover">
          <img
            className="absolute md:left-[40%] left-0 md:top-[30%] sm:top-[60%] xs:top-[65%] top-[75%] flex justify-center items-center z-[-1]"
            src="src/assets/Background.svg"
            alt="background image"
          />
        </div>
        <div className="flex flex-col items-center text-center pl-0 xl:pl-10 lg:pl-20 md:items-start md:text-start">
          <h1 className="xl:text-[3.5em] lg:text-[3em] sm:text-[2.5em] xs:text-[2em] text-[1.5em] font-bold sm:max-w-[37.5rem] max-w-[22rem] md:mt-[18rem] mt-[12rem] text-dark-grey">
            Just a better way to plan your
            <span className="text-white"> tripzz</span>
          </h1>
          <div className="flex xs:flex-row flex-col items-center sm:mt-10 mt-12">
            <button className="xl:w-[10rem] xl:h-[3.5rem] w-[8.5rem] h-[3rem] xl:text-[1em] text-[.875em] bg-white rounded-full font-bold text-dark-grey">
              Sign up
            </button>
            <button className="xl:w-[10rem] xl:h-[3.5rem] w-[8.5rem] h-[3rem] xl:text-[1em] text-[.875em] bg-dark-grey rounded-full xs:ml-6 ml-0 xs:mt-0 mt-6 font-bold text-white">
              Plan your trip
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
