import { useEffect, useRef, useState } from "react";

const Notes = () => {
  const [value, setValue] = useState("");

  const textAreaRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [value]);
  return (
    <div className="p-10 pt-0 mt-10">
      <h2 className="text-[1.25em] font-bold">Your Notes</h2>

      <textarea
        className="w-full mt-8 text-[.875em] resize-none min-h-[7.5rem] h-auto p-6 rounded-[1.25rem] bg-light-grey focus:outline-none "
        value={value}
        onChange={handleChange}
        rows="7"
        placeholder="Write your notes here..."
        ref={textAreaRef}
      ></textarea>
    </div>
  );
};

export default Notes;
