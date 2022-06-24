import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";

const HomeComponent = () => {
  const [workspaceList, setWorkSpace] = useState([]);
  const colRef = collection(db, "workspace");

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        let workspaces = [];
        snapshot.docs.forEach((doc) => {
          //   console.log(doc.data().visibility);
          if (doc.data().visibility === "public")
            workspaces.push({ ...doc.data(), id: doc.id });
        });
        setWorkSpace(workspaces);
      } else {
        setWorkSpace([]);
      }
    });
  }, []);

  return (
    <>
      <div className="min-h-[18rem]">
        <div className="mt-1  font-bold text-gray-900 tracking-tight text-4xl">
          Public Workspace
        </div>
        <div className=" mt-5 mx-auto text-xl text-gray-500">
          View all public Workspaces on CHello platforms
        </div>

        <div className="flex flex-col container max-w-sm mt-10 w-full items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <ul className="w-full">
            {workspaceList.length === 0 ? (
              <li className="flex flex-row w-full">
                <div
                  to={"/workspace/"}
                  className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4"
                >
                  <div className="flex-1 pl-1">
                    <div className="font-medium  dark:text-white">
                      Currently no public workspaces on CHello
                    </div>
                  </div>
                </div>
              </li>
            ) : null}
            {workspaceList.map((ws) => {
              return (
                <li className="flex flex-row w-full" key={ws.name}>
                  <div
                    to={"/workspace/" + ws.id}
                    className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4"
                  >
                    <div className="flex-1 pl-1">
                      <div className="font-medium dark:text-white">
                        {ws.name}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <div className="text-gray-600 dark:text-gray-200 text-xs">
                        {ws.members.length} Total Member
                      </div>
                      <button className="w-10 text-right flex justify-end">
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="min-h-[18rem]">
        <div className="mt-1  font-bold text-gray-900 tracking-tight text-4xl">
          Public Boards
        </div>
        <div className=" mt-5 mx-auto text-xl text-gray-500">
          View all public Boards on CHello platforms
        </div>
        <div className="flex flex-col container max-w-xs mt-10 w-full items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <ul className="w-full">
            <li className="flex flex-row w-full">
              <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                <div className="flex-1 pl-1">
                  <div className="font-medium  dark:text-white">
                    Currently no public boards on CHello
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
