import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";

const CloseBoard = () => {
  const [modal, setModal] = useState(false);
  const params = useParams();
  const nav = useNavigate();
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current == null) return;
      if (!menuRef.current.contains(e.target)) setModal(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <button
        onClick={() => {
          setModal(true);
        }}
        className=" text-left underline text-red-600 underline-offset-4 cursor-pointer"
      >
        Close Board
      </button>

      {modal ? (
        <div
          ref={menuRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="!PARENT p-12 w-96 h-fit bg-white rounded-lg border drop-shadow-xl">
            <p className="font-bold mb-4">Close Board?</p>
            <form action="" className="addBoard">
              <div className="space-y-6">
                <div className="">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-gray-600 block"
                  >
                    Are you sure you want to close this Board ?
                  </label>
                </div>
              </div>

              <div>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const ref = doc(db, "board", params.id);

                    await getDoc(ref).then((cb) => {
                      const newRef = doc(db, "closedboard", params.id);
                      setDoc(newRef, { ...cb.data() });
                    });

                    deleteDoc(ref);
                    nav("/home");
                  }}
                  className="mt-10 w-fit flex justify-center 
                hover:bg-red-500
                bg-red-600 p-2 rounded text-white"
                >
                  Close Board
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CloseBoard;
