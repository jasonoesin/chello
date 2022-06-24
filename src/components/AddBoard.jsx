import { useState, useRef, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Select from "react-select";
import { toast } from "react-toastify";

const auth = getAuth();
const options = [
  {
    value: "public",
    label: "Public Board",
  },
  {
    value: "workspace",
    label: "Workspace-Visible Board",
  },
  {
    value: "board",
    label: "Board-Visible Board",
  },
];

const AddBoard = () => {
  let [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current == null) return;
      if (!menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const colRef = collection(db, "board");

  useEffect(() => {
    const addForm = document.querySelector(".addBoard");
    if (addForm) {
      addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (
          addForm.title.value === "" ||
          addForm.desc.value === "" ||
          addForm.select.value === ""
        ) {
          toast.error("You can't leave the credentials empty !", {
            position: "bottom-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }

        setIsOpen(false);
        addDoc(colRef, {
          title: addForm.title.value,
          desc: addForm.desc.value,
          workspace: params.id,
          admins: [auth.currentUser.uid],
          members: [auth.currentUser.uid],
          visibility: addForm.select.value,
        });
      });
    }
  });

  return (
    <>
      <div className="p-4  w-[22rem] flex justify-center">
        <button
          href="#"
          className="p-6 w-full max-w-xs bg-gray-200 rounded-lg border border-gray-200 shadow-md hover:bg-gray-300
            flex justify-center items-center"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <div className="font-bold italic">Create a new Board</div>
        </button>
      </div>

      {isOpen ? (
        <div
          ref={menuRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="!PARENT p-12 w-96 h-[34rem] bg-white rounded-lg border drop-shadow-xl">
            <p className="font-bold mb-4">Create a new Board</p>
            <form action="" className="addBoard">
              <div className="space-y-6">
                <div className="">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-gray-600 block"
                  >
                    Board's Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                  <label
                    htmlFor=""
                    className="text-sm font-light text-gray-400 block"
                  >
                    This is the title of your new Board.
                  </label>
                </div>
                <div className="h-28">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-gray-600 block"
                  >
                    Board's Description
                  </label>
                  <textarea
                    name="desc"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1 h-full resize-none"
                  />
                  <label
                    htmlFor=""
                    className="text-sm font-light text-gray-400 block"
                  >
                    Board's description to show to other users.
                  </label>
                </div>

                <div className="relative !mt-16">
                  <div className="text-sm font-bold text-gray-600 ">
                    Board's Type
                  </div>
                  <div className="absolute w-full top-10">
                    <Select name="select" options={options} />
                  </div>
                </div>
              </div>

              <div>
                <button
                  className="mt-20 w-full flex justify-center 
            hover:bg-blue-600
            bg-blue-500 p-2 rounded text-white"
                >
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddBoard;
