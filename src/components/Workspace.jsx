import { useEffect } from "react";
import { useState } from "react";
import {
  doc,
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useParams } from "react-router-dom";
import { UserAuth } from "../middleware/AuthContext";

const auth = getAuth();

const Workspace = (props) => {
  const param = useParams();
  const [workspaceList, setWorkSpace] = useState([]);
  const [dropDown, setDropDown] = useState(param.id);
  const colRef = collection(db, "workspace");

  const { user } = UserAuth();

  useEffect(() => {
    // const getWorkSpaces = async () => {
    //   const data = await getDocs(colRef);
    //   setWorkSpace(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getWorkSpaces();

    if (user.uid !== undefined) {
      const q = query(
        colRef,
        where("members", "array-contains", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          let workspaces = [];
          snapshot.docs.forEach((doc) => {
            workspaces.push({ ...doc.data(), id: doc.id });
          });
          setWorkSpace(workspaces);
        } else {
          setWorkSpace([]);
        }
      });
    } else {
    }
  }, [user]);

  return (
    <div className="space-y-0.5">
      {workspaceList.map((workspace) => {
        return (
          <div key={workspace.id}>
            <div
              onClick={() => {
                if (dropDown === workspace.id) setDropDown("");
                else setDropDown(workspace.id);
              }}
              className="p-2 flex items-center justify-between w-full cursor-pointer transition hover:bg-gray-200"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={
                    workspace.admins.includes(user.uid)
                      ? "#60a5fa"
                      : "currentColor"
                  }
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

            {workspace.id == dropDown ? (
              <>
                <Link
                  to={"/workspace/" + workspace.id}
                  className="px-8 py-2  flex items-center justify-between w-full cursor-pointer transition hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                  <p className="w-3/4">Boards</p>
                </Link>
                <Link
                  to={"/workspace/" + workspace.id + "/settings"}
                  className="px-8 py-2  flex items-center justify-between w-full cursor-pointer transition hover:bg-gray-200"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="w-3/4">Settings</p>
                </Link>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Workspace;
