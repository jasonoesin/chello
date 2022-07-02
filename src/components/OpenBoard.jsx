import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { Fragment, useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";

const OpenBoard = (props) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!popRef.current) return;
      if (ref2.current.contains(e.target)) return;
      if (popRef.current.contains(e.target)) return;
      setModal(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const popRef = useRef();
  const ref2 = useRef();
  return (
    <Fragment>
      <svg
        ref={popRef}
        onClick={() => {
          setModal(!modal);
        }}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 absolute -right-12 cursor-pointer stroke-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
        />
      </svg>
      {modal && (
        <div
          ref={ref2}
          className="text-gray-500 rounded absolute -right-[18rem] bg-white shadow-lg h-32 p-3 w-[12rem] flex justify-center items-center flex-col"
        >
          Open this Board ?
          <button
            onClick={() => {
              const newRef = doc(db, "board", props.board.id);
              setDoc(newRef, { ...props.board });
              deleteDoc(doc(db, "closedboard", props.board.id));
            }}
            className="text-xs font-bold mt-2 w-fit flex justify-center 
            hover:bg-blue-500
            bg-blue-600 p-2 rounded text-white"
          >
            Open
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default OpenBoard;
