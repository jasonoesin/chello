import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NotificationComponent from "./NotificationComponent";

const NotificationPop = () => {
  let [isOpen, setIsOpen] = useState(false);

  let menuRef = useRef();
  let svgRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current) return;

      if (svgRef.current.contains(e.target)) return;

      if (menuRef.current.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div
        ref={svgRef}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        className="h-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:bg-gray-200 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </div>

      {isOpen ? (
        <>
          <div
            ref={menuRef}
            className="overflow-y-scroll mt-[29rem] w-[28rem] h-[24rem] absolute z-50 my-4 right-1 text-base list-none bg-white border rounded divide-y divide-gray-100 drop-shadow-xl dark:divide-gray-600"
            id="dropdown-menu"
          >
            <div className="relative h-full">
              <div className="py-3 px-4">
                <span className="block text-sm font-bold text-gray-900 dark:text-white">
                  Notifications
                </span>
              </div>
              <hr className="" />

              <NotificationComponent />
              <div className="underline cursor-pointer py-3 px-4 sticky bottom-0 text-sm bg-white w-full">
                Change notification email frequency
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NotificationPop;
