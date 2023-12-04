const Hero = () => {
  return (
    <section className="sm:h-[40rem] xs:h-[36rem] h-[32rem] overflow-hidden relative w-screen bg-medium-grey">
      <main className="2xl:px-[17rem] xl:px-[12rem] md:px-20 px-8">
        <div className="z-30 flex flex-col items-center text-center pl-0 lg:pl-20 md:items-start md:text-start">
          <h1 className="xl:text-[3em] lg:text-[2.5em] sm:text-[2em] xs:text-[1.75em] text-[1.5em] font-bold lg:max-w-[37.5rem] sm:max-w-[30rem] max-w-[22rem] md:mt-[14rem] xs:mt-[8rem] mt-[6rem] text-dark-grey">
            Just a better way to plan your
            <span className="text-white"> tripzz</span>
          </h1>

          <div className="flex xs:flex-row flex-col items-center sm:mt-10 mt-12">
            <button className="xl:h-[3.5rem] h-[3rem] xl:text-[1em] text-[.875em] text-white px-6 bg-dark-grey rounded-full font-bold cursor-pointer hover:bg-black">
              Sign in
            </button>

            <button className="xl:h-[3.5rem] h-[3rem] xl:text-[1em] text-[.875em] px-6 bg-transparent rounded-full xs:ml-6 ml-0 xs:mt-0 mt-6 font-bold text-dark-grey border border-dark-grey hover:text-black hover:border-black">
              Plan your trip
            </button>
          </div>
        </div>

        <img
          className="absolute md:left-[40%] left-0 md:top-[30%] sm:top-[60%] xs:top-[65%] top-[75%] flex justify-center items-center"
          src="src/assets/Background.svg"
          alt="background image"
        />
      </main>
    </section>
  );
};

export default Hero;
