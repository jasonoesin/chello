import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddWorkSpace from "./AddWorkSpace";
import ViewClosedBoards from "./ViewClosedBoards";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstModal, setFirstModal] = useState(false);

  function handleClose() {
    setShowModal(false);
  }

  function handleCloseFirst() {
    setFirstModal(false);
  }

  return (
    <>
      <div className="flex flex-col space-y-0.5">
        <p
          onClick={() => setFirstModal(true)}
          className="w-full cursor-pointer transition hover:bg-blue-200 p-2"
        >
          View Closed Boards
        </p>
        <div className="w-full p-2 flex flex-row text-gray-400">
          Add Workspace
          <div
            onClick={() => setShowModal(true)}
            className="ml-20 cursor-pointer "
          >
            +
          </div>
        </div>
        <div className="">
          <hr className="w-full border-t-2 border-blue-300" />
        </div>
      </div>
      {firstModal && <ViewClosedBoards onClose={handleCloseFirst} />}

      {showModal ? <AddWorkSpace onClose={handleClose} /> : null}
    </>
  );
};

export default Sidebar;
