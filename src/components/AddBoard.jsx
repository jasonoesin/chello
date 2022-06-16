import { useState, useRef, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const AddBoard = () => {
  let [isOpen, setIsOpen] = useState(false);

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
        setIsOpen(false);
        addDoc(colRef, {
          title: addForm.title.value,
          desc: addForm.desc.value,
        });
      });
    }
  });

  return (
    <>
      <div className="p-4  w-[22rem] flex justify-center">
        <button
          href="#"
          className="block p-6 w-full max-w-xs bg-gray-200 rounded-lg border border-gray-200 shadow-md hover:bg-gray-300
            flex justify-center items-center"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <div className="font-bold italic">Create a new Board</div>
        </button>
      </div>

      {isOpen ? (
        <div
          ref={menuRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="!PARENT p-12 w-96 h-[32rem] bg-white rounded-lg border">
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
              </div>

              <div>
                <button
                  className="mt-24 w-full flex justify-center 
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