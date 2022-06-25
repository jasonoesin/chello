import { useEffect } from "react";
import { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams, useLocation, Link } from "react-router-dom";

const Board = () => {
  const [boards, setBoard] = useState([]);
  const colRef = collection(db, "board");
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const q = query(colRef, where("workspace", "==", params.id));

    const snaps = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        let b = [];
        snapshot.docs.forEach((doc) => {
          b.push({ ...doc.data(), id: doc.id });
        });
        setBoard(b);
      } else {
        setBoard([]);
      }
    });

    return snaps;
  }, [location]);

  function vis(val) {
    if (val === "public") return "Public";
    else if (val === "workspace") return "Workspace-Visible";
    else if (val === "board") return "Board-Visible ";
  }

  function col(val) {
    if (val === "public") return "bg-green-600";
    else if (val === "workspace") return "bg-gray-600";
    else if (val === "board") return "bg-blue-600 ";
  }

  var createNewBoard = (board) => {
    return (
      <div
        key={board.id}
        className="p-4  w-[22rem] flex justify-center relative z-[1]"
      >
        <Link
          to={"/board/" + board.id}
          className="block p-6 w-full max-w-xs bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div
            className={`absolute top-20 text-white text-xs italic rounded ${col(
              board.visibility
            )} px-3 py-1`}
          >
            {vis(board.visibility)}
          </div>
          <h5 className="w-full mb-2 text-2xl font-bold tracking-tight h-16 text-gray-900 dark:text-white overflow-hidden">
            {board.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 h-20 overflow-hidden w-full">
            {board.desc}
          </p>
        </Link>
      </div>
    );
  };

  return <>{boards.map(createNewBoard)}</>;
};

export default Board;
