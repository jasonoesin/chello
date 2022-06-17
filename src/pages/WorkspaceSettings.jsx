import { useEffect, useState } from "react";
import InviteWorkspace from "../components/InviteWorkspace";

const WorkspaceSettings = () => {
  const [showModal, setShowModal] = useState(false);

  function handleClose() {
    setShowModal(false);
  }

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

          <div className="underline text-red-600 underline-offset-2 cursor-pointer">
            Delete this workspace
          </div>
        </div>
      </div>

      {showModal ? <InviteWorkspace onClose={handleClose} /> : null}
    </div>
  );
};

export default WorkspaceSettings;
