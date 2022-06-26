import { useEffect, useState } from "react";
import { useRef } from "react";
import DateComponent from "./DateComponent";

const DueDate = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (ref.current.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={ref}>
      <div
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        className="!SHARE relative p-2 mt-2 flex bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="ml-2">Set Due Date</p>
      </div>

      {isOpen ? (
        <div className="z-30 !CLICKED_LABEL bg-white border-gray-50 border rounded drop-shadow-xl h-1/3 absolute w-[21rem]">
          <p className="w-full text-center p-3">Set a due date for card</p>

          <DateComponent card={props.card} board={props.board} />
        </div>
      ) : null}
    </div>
  );
};

export default DueDate;
