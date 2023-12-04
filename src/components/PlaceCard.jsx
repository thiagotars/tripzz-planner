import { FaRegClock } from "react-icons/fa6";

const PlaceCardOpen = (event) => {
  const place = event.event;

  const getEventImage = (place) => {
    let className = "rounded-[1.25rem] bg-cover w-[13.5rem]";
    if (place.image) {
      className += ` ${place.image}`;
    }
    return className;
  };
  return (
    <div className="flex justify-between mt-4 overflow-hidden border h-[9rem] rounded-[1.25rem]">
      <div className="flex flex-col justify-between pt-6 px-6 pb-4">
        <div className="">
          <h6 className="font-bold text-[.875em]">
            <span className="font-normal">@ </span>
            {place.title}
          </h6>
          <p className="text-dark-grey mt-1 ml-6 text-[.75em] tracking-wide">
            {place.description}
          </p>
        </div>
        <div className="flex gap-8 ml-6 text-[.875em] text-dark-grey font-bold">
          <button
            className={
              place.time
                ? "flex items-center gap-1 font-bold text-black hover:text-dark-grey"
                : "font-bold text-dark-grey hover:text-black"
            }
          >
            {place.time && <FaRegClock />}
            {place.time ? place.time : "Time"}
          </button>
          <button
            className={
              place.cost
                ? "font-bold text-black hover:text-dark-grey"
                : "font-bold text-dark-grey hover:text-black"
            }
          >
            {place.cost ? `$ ${place.cost}` : "Cost"}
          </button>
          <button
            className={
              place.attachment
                ? "font-bold text-black hover:text-dark-grey"
                : "font-bold text-dark-grey hover:text-black"
            }
          >
            {place.attachment ? place.attachment : "Attachment"}
          </button>
        </div>
      </div>
      <div className={getEventImage(place)}></div>
    </div>
  );
};

export default PlaceCardOpen;
