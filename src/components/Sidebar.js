import { Link } from "react-router-dom";
import { useState } from "react";
import AddWorkSpace from "./AddWorkSpace";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  function handleClose() {
    setShowModal(false);
  }

  return (
    <div className="flex flex-col space-y-0.5">
      <p className="w-1/6 cursor-pointer transition hover:bg-blue-200 p-2">
        Board
      </p>
      <p className="w-1/6 cursor-pointer transition hover:bg-blue-200 p-2">
        Lists
      </p>
      <p className="w-1/6 cursor-pointer transition hover:bg-blue-200 p-2">
        Workspaces
      </p>
      <div className="w-1/6 p-2 flex flex-row">
        Add Workspace
        <div
          onClick={() => setShowModal(true)}
          className="ml-20 cursor-pointer "
        >
          +
        </div>
      </div>

      {showModal ? <AddWorkSpace onClose={handleClose} /> : null}
    </div>
  );
};

export default Sidebar;
