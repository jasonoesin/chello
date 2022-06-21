import { useEffect } from "react";
import LabelColor from "./LabelColor";
import { db } from "../firebase-config";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useRef } from "react";

const CardDetail = (props) => {
  const [data, setData] = useState([]);
  var curr = data;

  var ref = useRef();
  var ref2 = useRef();

  const colRef = doc(db, "card", props.current.id);

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      setData(snapshot.data());
    });

    return unsub;
  }, []);

  return (
    <>
      <div className="backdrop-blur-sm z-30 inset-0 bg-black bg-opacity-30 h-screen flex justify-center  overflow-y-hidden p-28 fixed">
        <div className="bg-white p-10 rounded w-2/3 h-[33rem] relative">
          <svg
            onClick={() => {
              props.handle("");
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute cursor-pointer left-5 top-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="!DIVIDER flex">
            <div className="!LEFT flex flex-col grow">
              <p className="p-2 text-2xl">{curr.title}</p>

              {curr.labels ? (
                <div className="flex">
                  {curr.labels.map((label) => {
                    return (
                      <div
                        key={label}
                        className={`h-2 w-10 ${label} rounded-md mt-1 ml-3`}
                      ></div>
                    );
                  })}
                </div>
              ) : null}

              <p className="p-2 text-md">Card Description</p>
              <div className="p-2">
                <textarea
                  id="textarea"
                  className="p-2 focus:outline-none bg-gray-100 resize-none w-full overflow-y-hidden "
                  type="text"
                  placeholder="Add a more detailed description "
                />
              </div>
              <p className="p-2 text-md">Card Comments</p>
            </div>

            <div className="ml-8 !RIGHT w-40 text-sm text-gray-600">
              <p className="p-2"> Add to Card</p>
              <div
                onClick={() => {
                  ref.current.classList.toggle("hidden");
                }}
                className="!LABEL relative p-2 flex bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#4b5563"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <p className="ml-2">Labels</p>
              </div>

              <div
                ref={ref2}
                className=" hidden !CUSTOM_LABEL bg-white border-gray-50 border rounded drop-shadow-xl h-52 absolute  w-64  flex-col  text-xs"
              >
                <svg
                  onClick={() => {
                    ref.current.classList.toggle("hidden");
                    ref2.current.classList.toggle("hidden");
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 absolute w-4 top-4 left-2 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <p className="w-full text-center p-3 text-sm">
                  Create a new Label
                </p>
                <label className="px-3 py-1" htmlFor="">
                  Name
                </label>
                <div className="px-3">
                  <input
                    className="p-3 w-full h-[2rem] border-2 rounded "
                    type="text"
                  />
                </div>
                <p className="px-3 py-1 mt-1">Select a color</p>
                <div className="px-3">
                  <input
                    type="color"
                    id="favcolor"
                    name="favcolor"
                    defaultValue="#ff0000"
                  ></input>
                </div>

                <div className="px-3">
                  <button className="px-3 py-2 bg-blue-500 rounded text-white absolute bottom-3">
                    Create
                  </button>
                </div>
              </div>

              <div
                ref={ref}
                className="hidden !CLICKED_LABEL bg-white border-gray-50 border rounded drop-shadow-xl h-fit absolute w-64"
              >
                <p className="w-full text-center p-3">Labels</p>
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-green-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-yellow-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-orange-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-red-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-blue-400"
                />
                <div className="py-3 px-2  text-gray-500">
                  <button
                    onClick={() => {
                      ref.current.classList.toggle("hidden");
                      ref2.current.classList.toggle("hidden");
                    }}
                    className="bg-gray-50 w-full rounded h-8 hover:bg-gray-200"
                  >
                    Create a new label
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
