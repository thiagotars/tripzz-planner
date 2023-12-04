const About = () => {
  return (
    <section className="2xl:px-[280px] xl:px-[200px] sm:px-[80px] px-6 pt-[120px] md:pt-[200px] pb-[120px]">
      <div className="flex md:flex-row flex-col-reverse 2xl:mx-20 mx-0">
        <div className="h-[424px] bg-medium-grey md:mr-6 md:w-3/5 md:mt-0 mt-8 mr-0 w-full rounded-[25px]"></div>
        <div className="pl-0 w-full text-center md:text-start md:w-2/5 md:pl-4">
          <h4 className="lg:text-[2em] sm:text-[1.5em] text-[1.25em] font-bold">
            All you need for your trip on the same planner
          </h4>
          <p className="mt-4 text-[.875em] md:text-[1em]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore sit
            voluptatem corrupti ullam magnam mollitia alias dolorum iusto, ut
            culpa, quibusdam quam explicabo tempore magni earum id dolorem modi
            molestiae.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
