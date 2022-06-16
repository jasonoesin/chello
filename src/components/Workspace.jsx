import { useEffect } from "react";
import { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

const Workspace = () => {
  const [workspaceList, setWorkSpace] = useState([]);

  const colRef = collection(db, "workspace");

  useEffect(() => {
    // const getWorkSpaces = async () => {
    //   const data = await getDocs(colRef);
    //   setWorkSpace(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getWorkSpaces();
    onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        let workspaces = [];
        snapshot.docs.forEach((doc) => {
          workspaces.push({ ...doc.data(), id: doc.id });
        });
        setWorkSpace(workspaces);
      }
    });
  }, []);
  return (
    <div className="space-y-0.5">
      {workspaceList.map((workspace) => {
        return (
          <div
            key={workspace.id}
            className="p-2 flex items-center justify-between w-full cursor-pointer transition hover:bg-gray-200"
          >
            <div className="">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-2 w-full">{workspace.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Workspace;
