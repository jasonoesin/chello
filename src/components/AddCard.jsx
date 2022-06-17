import { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const AddCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = collection(db, "card");
  const value = useRef("");

  function addCard() {
    value.current = document.getElementById("textarea").value;
    addDoc(ref, {
      title: value.current,
      list: props.list,
    });
    setIsOpen(false);
  }

  const addingCard = () => {
    return (
      <>
        <div className="!NEWCARD  bg-white rounded-md border drop-shadow-md">
          <div className="p-2">
            <textarea
              id="textarea"
              className="focus:outline-none resize-none w-full overflow-y-hidden "
              type="text"
              placeholder="Enter a title for this card "
            />
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <button
            onClick={addCard}
            className="rounded-md text-white bg-blue-500 px-4 py-2"
          >
            Add Card
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 ml-2 stroke-slate-500 hover:stroke-slate-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </>
    );
  };

  return (
    <div className="">
      {isOpen ? addingCard() : null}
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="!ADD CARD p-2 text-gray-500 flex cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>

        <p className="ml-1">Add a Card</p>
      </button>
    </div>
  );
};

export default AddCard;
