import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BoardMember from "../components/BoardMember";
import DeleteWorkspace from "../components/DeleteWorkspace";
import InviteBoard from "../components/InviteBoard";
import InviteWorkspace from "../components/InviteWorkspace";
import LeaveWorkspace from "../components/LeaveWorkspace";
import Member from "../components/Member";
import MembersFactory from "../components/MembersFactory";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const auth = getAuth();

const BoardSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMember, setIsMember] = useState(true);
  const [data, setData] = useState({});
  const params = useParams();

  const ref = doc(db, "board", params.id);

  function handleClose() {
    setShowModal(false);
  }

  const { user, nav } = UserAuth();

  useEffect(() => {
    var unsub;
    if (user.uid) {
      unsub = onSnapshot(ref, (snap) => {
        if (snap.data() === undefined) {
          return;
        }
        setData(snap.data());

        if (!snap.data().members.includes(user.uid)) nav("/home");

        if (snap.data().admins.includes(user.uid)) {
          setIsMember(false);
          return;
        }

        // VALIDASI APAKAH BOARD MEMBER

        if (snap.data().members.includes(user.uid)) {
          setIsMember(true);
          return;
        }

        // VALIDASI APAKAH WORKSPACE MEMBER DAN VISIBILITY WORKSPACE
        if (snap.data().visibility === "workspace") {
          const workRef = doc(db, "workspace", snap.data().workspace);
          onSnapshot(workRef, (d) => {
            if (!d.data().members.includes(user.uid)) {
              console.log("Not Eligible to See Board");
              nav("/home");
              return;
            } else if (d.data().members.includes(user.uid)) {
              setIsMember(true);
              return;
            }
          });
        }
      });
    }

    return unsub;
  }, [user]);

  var dropRef = useRef();
  var ref2 = useRef();

  let handler = (e) => {
    if (dropRef.current == null) return;
    if (!dropRef.current.contains(e.target)) {
      dropRef.current.classList.toggle("hidden");

      document.removeEventListener("mousedown", handler);
    }
  };

  const handleOnClick = (e) => {
    dropRef.current.classList.toggle("hidden");
    document.addEventListener("mousedown", handler);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const setBoardVisible = () => {
    if (data.visibility === "board") return;

    updateDoc(ref, {
      visibility: "board",
    });
  };

  const setPublic = () => {
    if (data.visibility === "public") return;
    updateDoc(ref, {
      visibility: "public",
    });
  };

  const setWorkspaceVisible = () => {
    if (data.visibility === "workspace") return;
    updateDoc(ref, {
      visibility: "workspace",
    });
  };

  return (
    <>
      <div className="h-0">EMTPY DIV</div>
      <div className="mt-24 w-screen h-fit">
        <div className="px-16 flex justify-center ">
          <div className="flex flex-col justify-center w-2/5 space-y-5 relative">
            <div className="mt-1 mb-3 font-bold text-gray-900 tracking-tight text-4xl">
              {data.title}
            </div>
            <div className="font-bold">Board Settings</div>
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
              <p className="font-bold">
                {data.visibility
                  ? capitalizeFirstLetter(data.visibility)
                  : null}
              </p>

              <button
                ref={ref2}
                onClick={handleOnClick}
                className="absolute right-0  rounded bg-gray-500 px-3 py-2 text-white top-[7rem]  hover:bg-gray-600"
              >
                Change
              </button>
              <div
                ref={dropRef}
                className=" hidden bg-white z-50 top-[10rem] -right-[15rem] absolute w-[20rem] text-xs  flex flex-col space-y-3 p-4 border shadow-md rounded"
              >
                <div className="font-bold text-sm">Select Board Visibility</div>
                <hr />

                <button
                  onClick={setWorkspaceVisible}
                  className="hover:bg-gray-100 rounded p-3"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <p className="ml-2">Workspace-Visible</p>

                    {data.visibility && data.visibility === "workspace" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : null}
                  </div>
                  <p className="text-justify">
                    All members of the Workspace can see and edit this board.
                  </p>
                </button>

                <button
                  onClick={setPublic}
                  className="hover:bg-gray-100 rounded p-3"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="ml-2">Public</p>
                    {data.visibility && data.visibility === "public" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : null}
                  </div>

                  <p className="text-justify">
                    This Workspace is public. It's visible to anyone with the
                    link and will show up in search engines like Google. Only
                    those invited to the Workspace can add and edit Workspace
                    boards.
                  </p>
                </button>
                <button
                  onClick={setBoardVisible}
                  className="hover:bg-gray-100 rounded p-3"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                      />
                    </svg>
                    <p className="ml-2">Board-Visible</p>
                    {data.visibility && data.visibility === "board" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : null}
                  </div>

                  <p className="text-justify">
                    This Board is private. Only board members can see and edit
                    this board.
                  </p>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="text-center bg-blue-600 rounded hover:bg-blue-700 text-white py-3"
            >
              Invite others to Board
            </button>

            <p className="font-bold">Members</p>

            <MembersFactory type="board" isMember={isMember} />

            {isMember ? (
              <LeaveWorkspace user={user.uid} />
            ) : (
              <>
                <LeaveWorkspace user={user.uid} isMember={isMember} />
                <DeleteWorkspace />
              </>
            )}
          </div>
        </div>

        {showModal ? <InviteBoard onClose={handleClose} /> : null}
      </div>
    </>
  );
};

export default BoardSettings;
