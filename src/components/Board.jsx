import { useEffect } from "react";
import { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

const Board = () => {
  const [boards, setBoard] = useState([]);
  const colRef = collection(db, "board");

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        let b = [];
        snapshot.docs.forEach((doc) => {
          b.push({ ...doc.data(), id: doc.id });
        });
        setBoard(b);
      }
    });
  }, []);

  return (
    <>
      {boards.map((board) => {
        return (
          <div key={board.id} className="p-4  w-[22rem] flex justify-center">
            <a
              href="#"
              className="block p-6 w-full  max-w-xs bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="w-full mb-2 text-2xl font-bold tracking-tight h-16 text-gray-900 dark:text-white overflow-hidden">
                {board.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 h-20 overflow-hidden w-full">
                {board.desc}
              </p>
            </a>
          </div>
        );
      })}
    </>
  );
};

export default Board;
