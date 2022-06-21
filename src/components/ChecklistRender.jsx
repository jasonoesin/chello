import { doc, onSnapshot } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { db } from "../firebase-config";

const CheckListRender = (props) => {
  const [checklists, setChecklists] = useState([]);

  const colRef = doc(db, "card", props.card);

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      //   setData(snapshot.data());
      setChecklists(snapshot.data().checklist ? snapshot.data().checklist : []);
    });

    return unsub;
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {checklists.map(({ name }) => {
          return (
            <Fragment key={name}>
              <div className="mt-1 px-3 flex items-center">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="p-3 grow">{name}</p>
                <button className="px-4 py-1 bg-blue-400 rounded text-white">
                  Delete
                </button>
              </div>

              <div className="p-3">
                <div className="bg-gray-400 w-full h-2 rounded-xl"></div>
                <button className="p-2 w-32 mt-2 bg-blue-400 rounded text-white">
                  Add an Item
                </button>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CheckListRender;
