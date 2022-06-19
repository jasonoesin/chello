import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";

const DeleteWorkspace = () => {
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
        Delete Workspace
      </button>

      {modal ? (
        <div
          ref={menuRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="!PARENT p-12 w-96 h-[24rem] bg-white rounded-lg border drop-shadow-xl">
            <p className="font-bold mb-4">Delete Workspace?</p>
            <form action="" className="addBoard">
              <div className="space-y-6">
                <div className="">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-gray-600 block"
                  >
                    Are you sure you want to delete this Workspace ?
                  </label>
                  <p className="text-gray-500 text-sm">Things to know</p>
                </div>

                <ul className="text-sm list-disc">
                  <li>This is permanent and can't be undone.</li>
                  <li>All boards in this Workspace will be closed.</li>
                  <li>Board admins can reopen boards.</li>
                  <li>
                    Board members will not be able to interact with closed
                    boards/
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => {
                    deleteDoc(doc(db, "workspace", params.id));

                    nav("/home");
                  }}
                  className="mt-10 w-full flex justify-center 
            hover:bg-red-500
            bg-red-600 p-2 rounded text-white"
                >
                  Delete Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteWorkspace;
