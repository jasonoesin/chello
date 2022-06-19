import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";

const LeaveWorkspace = (props) => {
  const [modal, setModal] = useState(false);
  const params = useParams();
  const nav = useNavigate();
  let menuRef = useRef();

  const ref = doc(db, "workspace", params.id);

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
        Leave Workspace
      </button>

      {modal ? (
        <div
          ref={menuRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="!PARENT p-12 w-96 h-[18rem] bg-white rounded-lg border drop-shadow-xl">
            <p className="font-bold mb-4">Leave Workspace?</p>
            <form action="" className="addBoard">
              <div className="space-y-6">
                <div className="">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-gray-600 block"
                  >
                    Are you sure you want to leave this Workspace ?
                  </label>
                  <p className="text-gray-500 text-sm">Things to know</p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    updateDoc(ref, {
                      members: arrayRemove(props.user),
                    });

                    nav("/home");
                  }}
                  className="mt-10 w-full flex justify-center 
            hover:bg-red-500
            bg-red-600 p-2 rounded text-white"
                >
                  Leave Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LeaveWorkspace;
