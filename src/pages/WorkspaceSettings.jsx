import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteWorkspace from "../components/DeleteWorkspace";
import InviteWorkspace from "../components/InviteWorkspace";
import LeaveWorkspace from "../components/LeaveWorkspace";
import Member from "../components/Member";
import Notification from "../components/Notification";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";
import Select from "react-select";

const auth = getAuth();

const WorkspaceSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMember, setIsMember] = useState(true);
  const params = useParams();

  const ref = doc(db, "workspace", params.id);

  function handleClose() {
    setShowModal(false);
  }

  const { user, nav } = UserAuth();

  useEffect(() => {
    if (user.uid) {
      getDoc(ref).then((snap) => {
        if (snap.data() === undefined) {
          return;
        }

        if (!snap.data().members.includes(user.uid)) nav("/home");
        if (snap.data().admins.includes(user.uid)) {
          setIsMember(false);
        }
      });
    }
  }, [user]);

  return (
    <div className="mt-24 w-screen h-fit">
      <div className="px-16 flex justify-center ">
        <div className="flex flex-col justify-center w-2/5 space-y-5 relative">
          <div className="font-bold">Workspace Settings</div>
          <div className="flex">
            <div className="w-12">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <p className="font-bold">Private</p>

            <button className="absolute right-0 rounded bg-gray-500 px-3 py-2 text-white top-9  hover:bg-gray-600">
              Change
            </button>
          </div>
          <div className="">
            This Workspace is private. It's not indexed or visible to those
            outside the Workspace.
          </div>

          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="text-center bg-blue-600 rounded hover:bg-blue-700 text-white py-3"
          >
            Invite others to Workspace
          </button>

          <p className="font-bold">Members</p>

          <Member isMember={isMember} />

          {isMember ? <LeaveWorkspace user={user.uid} /> : <DeleteWorkspace />}
        </div>
      </div>

      {showModal ? <InviteWorkspace onClose={handleClose} /> : null}
    </div>
  );
};

export default WorkspaceSettings;
