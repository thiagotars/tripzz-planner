import { FaPlus, FaStar } from "react-icons/fa";

const PlacesToVisit = () => {
  return (
    <div className="my-[6rem]">
      {/* Places to Visit */}
      <div className="">
        <h2 className="text-[1.5em] font-bold">Explore Places to Visit</h2>
        {/* Container */}
        <div className="grid grid-rows-2 grid-flow-col gap-4 py-10">
          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-ciutadella bg-cover bg-no-repeat bg-center">
              {/* <img className=" " src="../src/assets/labacoa.jpg" alt="" /> */}
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875rem]">Parc de la Ciutadella</p>
                <div className="flex text-[.75rem] gap-3 text-dark-grey">
                  <p>Park</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>Free</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-guell bg-cover bg-no-repeat bg-center">
              {/* <img className=" " src="../src/assets/labacoa.jpg" alt="" /> */}
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875em]">Parc Guell</p>
                <div className="flex text-[.75em] gap-3 text-dark-grey">
                  <p>Park</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>15 Euros</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-barceloneta bg-cover bg-no-repeat bg-center"></div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875em]">Playa de Barceloneta</p>
                <div className="flex text-[.75em] gap-3 text-dark-grey">
                  <p>Beach</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>Free</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-sagrada bg-cover bg-no-repeat bg-center"></div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875em]">Sagrada Familia</p>
                <div className="flex text-[.75em] gap-3 text-dark-grey">
                  <p>Church</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>15 Euros</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Places to Eat */}
      <div className="mt-12">
        <h2 className="text-[1.5em] font-bold">Explore Places to Eat</h2>

        {/* Container */}
        <div className="grid grid-rows-2 grid-flow-col gap-4 py-10">
          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-bacoa bg-cover bg-no-repeat bg-center">
              {/* <img className=" " src="../src/assets/labacoa.jpg" alt="" /> */}
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875rem]">Bacoa</p>
                <div className="flex text-[.75rem] gap-3 text-dark-grey">
                  <p>Hamburger</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>$$$</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-koku bg-cover bg-no-repeat bg-center"></div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875em]">Koku Kitchen</p>
                <div className="flex text-[.75em] gap-3 text-dark-grey">
                  <p>Asian</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>$$$</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-montaditos bg-cover bg-no-repeat bg-center">
              {/* <img className=" " src="../src/assets/labacoa.jpg" alt="" /> */}
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875em]">100 Montaditos</p>
                <div className="flex text-[.75em] gap-3 text-dark-grey">
                  <p>Tapas</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>$$$</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="flex items-center h-[5rem] pr-4 border rounded-[1.25rem] overflow-hidden">
            <div className="h-full rounded-[1.25rem] min-w-[6.5rem] bg-congracia bg-cover bg-no-repeat bg-center">
              {/* <img className=" " src="../src/assets/labacoa.jpg" alt="" /> */}
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-start ml-4 gap-1">
                <p className="text-[.875em]">Con Gracia</p>
                <div className="flex text-[.75em] gap-3 text-dark-grey">
                  <p>Mediterranean</p>
                  <p>|</p>
                  <div className="flex gap-1 items-center">
                    <p>4.7</p>
                    <FaStar />
                  </div>
                  <p>|</p>
                  <p>$$$</p>
                </div>
              </div>

              <button className="h-8 w-8 hover:text-dark-grey">
                <FaPlus className="m-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesToVisit;
