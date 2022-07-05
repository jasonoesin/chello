import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Fragment, useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";
import Select from "react-select";
import { UserAuth } from "../middleware/AuthContext";

import { toast } from "react-toastify";

const OpenBoard = (props) => {
  const [modal, setModal] = useState(false);
  const { user } = UserAuth();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (user.uid) {
      const q = query(
        collection(db, "workspace"),
        where("members", "array-contains", user.uid)
      );

      onSnapshot(q, (snap) => {
        if (!snap.empty) {
          let b = [];
          snap.docs.forEach((d) => {
            if (d.data().id === user.uid) return;

            b.push({
              value: d.id,
              label: d.data().name,
            });
          });

          setOptions(b);
        } else {
          setOptions([]);
        }
      });
    }
  }, []);

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

  const selectRef = useRef();
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
          className="text-gray-500 rounded absolute -right-[20rem] bg-white shadow-lg h-fit p-3 w-[16rem] flex justify-center items-center flex-col"
        >
          Open this Board ?<p>Select Workspace to open on</p>
          <Select
            onChange={(e) => {
              selectRef.current = e.value;
            }}
            className="mt-2 w-full"
            options={options}
          />
          <button
            onClick={() => {
              if (selectRef.current === undefined) {
                toast.error(
                  "Please select Workspace to open the closed board on !",
                  {
                    position: "bottom-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              }
              const newRef = doc(db, "board", props.board.id);
              setDoc(newRef, { ...props.board, workspace: selectRef.current });
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
