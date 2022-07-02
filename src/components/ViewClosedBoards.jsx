import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";
import OpenBoard from "./OpenBoard";

const ViewClosedBoards = (props) => {
  const [boardList, setBoardList] = useState([]);
  const { user } = UserAuth();
  const colRef = collection(db, "closedboard");
  const q = query(colRef, where("admins", "array-contains", user.uid));

  useEffect(() => {
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setBoardList(
          snap.docs.map((d) => {
            return { ...d.data(), id: d.id };
          })
        );
      } else setBoardList([]);
    });
  }, []);

  return (
    <div className="backdrop-blur-sm z-[100] inset-0 bg-black bg-opacity-30 h-screen flex justify-center  overflow-y-scroll p-28 fixed">
      <div className="bg-white p-10 rounded w-2/3 min-h-[33rem] h-fit relative">
        <svg
          onClick={() => {
            props.onClose();
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute cursor-pointer right-4 top-4"
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

        <div className="mt-1  font-bold text-gray-900 tracking-tight text-4xl">
          Closed Boards
        </div>
        <div className=" mt-5 mx-auto text-xl text-gray-500">
          View all closed Boards
        </div>

        <div className="flex flex-col container max-w-xs mt-10 w-full items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <ul className="w-full">
            {boardList.length === 0 ? (
              <li className="flex flex-row w-full">
                <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                  <div className="flex-1 pl-1">
                    <div className="font-medium  dark:text-white">
                      Currently no closed boards
                    </div>
                  </div>
                </div>
              </li>
            ) : null}
            {boardList.map((b) => {
              return (
                <li
                  className="flex flex-row w-full relative items-center"
                  key={b.title}
                >
                  <OpenBoard board={b} />
                  <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                    <div className="flex-1 pl-1">
                      <div className="font-medium dark:text-white">
                        {b.title}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <div className="text-gray-600 dark:text-gray-200 text-xs">
                        {b.members.length} Total Member
                      </div>
                      <button className="w-10 text-right flex justify-end">
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewClosedBoards;
