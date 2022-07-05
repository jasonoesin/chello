import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const JoinedBoards = forwardRef((props, ref) => {
  const [boards, setBoards] = useState([]);
  const { nav, user } = UserAuth();
  const [data, setCurrentData] = useState({});
  const cleanBoards = useRef([]);

  useEffect(() => {
    var unsub, unsub2;
    if (user.uid) {
      const boardRef = query(
        collection(db, "board"),
        where("members", "array-contains", user.uid)
      );

      unsub = onSnapshot(boardRef, (dat) => {
        setBoards(
          dat.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );

        cleanBoards.current = dat.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        // if (useRef.current === undefined) useRef.current = [];
      });

      unsub2 = onSnapshot(doc(db, "user", user.uid), (key) => {
        setCurrentData({ ...key.data(), id: key.id });
      });
    }

    return () => {
      if (unsub) unsub();
      if (unsub2) unsub2();
    };
  }, [user]);

  useImperativeHandle(ref, () => ({
    onFilter(e) {
      if (e.target.value !== "") {
        setBoards(
          boards.filter((ws) => {
            return ws.title
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          })
        );
      } else {
        setBoards(cleanBoards.current);
      }
    },
  }));

  return (
    <div className="min-h-[18rem] mt-14">
      <div className="mt-1  font-bold text-gray-900 tracking-tight text-4xl">
        Joined Boards
      </div>

      <div className=" mt-5 mx-auto text-xl text-gray-500">
        View all joined Boards
      </div>
      <div className="flex flex-col container max-w-xs mt-10 w-full items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <ul className="w-full">
          {boards.length === 0 ? (
            <li className="flex flex-row w-full">
              <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                <div className="flex-1 pl-1">
                  <div className="font-medium  dark:text-white">
                    Currently no joined boards
                  </div>
                </div>
              </div>
            </li>
          ) : null}
          {boards.map((b) => {
            return (
              <li
                className="flex flex-row w-full relative items-center"
                key={b.title}
              >
                <svg
                  onClick={async () => {
                    if (data && data.favorite && !data.favorite.includes(b.id))
                      updateDoc(doc(db, "user", user.uid), {
                        favorite: arrayUnion(b.id),
                      });
                    else {
                      updateDoc(doc(db, "user", user.uid), {
                        favorite: arrayRemove(b.id),
                      });
                    }
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`stroke-gray-500 h-6 w-6 absolute -right-12 flex cursor-pointer ${
                    data && data.favorite && data.favorite.includes(b.id)
                      ? "fill-yellow-300"
                      : null
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <Link
                  to={"/board/" + b.id}
                  className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4"
                >
                  <div className="flex-1 pl-1">
                    <div className="font-medium dark:text-white">{b.title}</div>
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
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default JoinedBoards;
