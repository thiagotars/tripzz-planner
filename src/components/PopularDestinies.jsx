import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrStar } from "react-icons/gr";
import React from "react";

const PopularDestinies = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="md:pb-52 px-12 md:px-0 mt-20 pb-40 flex flex-col justify-between pt-16 mx-auto w-full max-w-[800px]">
      <main className="2xl:mx-20 mx-0">
        <h2 className="sm:text-[1.25em] text-[1em] font-bold">
          Explore popular destinies
        </h2>
        <Slider className="relative lg:mt-12 mt-8 gap-4" {...settings}>
          {/* <div className="mt-8 gap-4"> */}
          <Link to="trip" className="flex flex-col rounded-[20px] border">
            <div className="min-h-[160px] bg-cover bg-center bg-barcelona rounded-[20px]"></div>
            <div className="flex flex-col justify-between w-full px-4 my-4">
              <div className="flex justify-between w-full">
                <h3 className="font-semibold text-sm">London</h3>
                <div className="flex gap-1 items-center">
                  <p className="text-sm">4.7</p>
                  <GrStar />
                </div>
              </div>
            </div>
          </Link>
          <Link to="trip" className=" flex flex-col rounded-[20px] border">
            <div className="min-h-[160px] bg-cover bg-center bg-paraty rounded-[20px]"></div>
            <div className="flex flex-col justify-between w-full px-4 my-4">
              <div className="flex justify-between w-full">
                <h3 className="font-semibold text-sm">Japan</h3>
                <div className="flex gap-1 items-center">
                  <p className="text-sm">4.7</p>
                  <GrStar />
                </div>
              </div>
            </div>
          </Link>
          <Link to="trip" className="flex flex-col rounded-[20px] border">
            <div className="min-h-[160px] bg-cover bg-center bg-barcelona rounded-[20px]"></div>
            <div className="flex flex-col justify-between w-full px-4 my-4">
              <div className="flex flex-col justify-center py-auto">
                <div className="flex justify-between w-full">
                  <h3 className="font-semibold text-sm">Paris</h3>
                  <div className="flex gap-1 items-center">
                    <p className="text-sm">4.7</p>
                    <GrStar />
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="trip" className=" flex flex-col rounded-[20px] border">
            <div className="min-h-[160px] bg-cover bg-center bg-paraty rounded-[20px]"></div>
            <div className="flex flex-col justify-between w-full px-4 my-4">
              <div className="flex flex-col justify-center py-auto">
                <div className="flex justify-between w-full">
                  <h3 className="font-semibold text-sm">Buenos Aires</h3>
                  <div className="flex gap-1 items-center">
                    <p className="text-sm">4.7</p>
                    <GrStar />
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* </div> */}
        </Slider>
      </main>
    </section>
  );
};

export default PopularDestinies;
