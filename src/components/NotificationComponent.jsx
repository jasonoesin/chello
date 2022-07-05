import { data } from "autoprefixer";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";
import { GetNotif } from "../notification/NotifContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationComponent = () => {
  const [wslist, setWslist] = useState([]);
  const [bdlist, setBdList] = useState([]);
  const [delList, setDelList] = useState([]);
  const { notifs } = GetNotif();
  const { user, userData } = UserAuth();

  useEffect(() => {
    if (notifs !== undefined) {
      if (notifs.invite !== undefined) {
        if (notifs.invite.find((obj) => obj["workspace"])) {
          let w = [];

          let array = notifs.invite.filter((obj) => obj["workspace"]);

          var prom = array.map(async ({ workspace }) => {
            await getDoc(doc(db, "workspace", workspace)).then((dat) => {
              w.push({ ...dat.data(), id: dat.id });
            });
          });

          Promise.all(prom).then(() => {
            setWslist(w);
          });
        } else {
          setWslist([]);
        }

        if (notifs.invite.find((obj) => obj["board"])) {
          let w = [];

          let array = notifs.invite.filter((obj) => obj["board"]);

          var prom = array.map(async ({ board }) => {
            await getDoc(doc(db, "board", board)).then((dat) => {
              w.push({ ...dat.data(), id: dat.id });
            });
          });

          Promise.all(prom).then(() => {
            setBdList(w);
          });
        } else {
          setBdList([]);
        }
      }

      if (notifs.delete !== undefined) {
        let w = [];

        var prom = notifs.delete.map(async (workspace) => {
          await getDoc(doc(db, "workspace", workspace)).then((dat) => {
            w.push({ ...dat.data(), id: dat.id });
          });
        });

        Promise.all(prom).then(() => {
          setDelList(w);
        });
      }
    }
  }, [notifs]);

  const handleAcc = (ws) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      invite: arrayRemove({ workspace: ws.id }),
    });

    var workspaceRef = doc(db, "workspace", ws.id);

    if (workspaceRef)
      updateDoc(workspaceRef, {
        members: arrayUnion(user.uid),
      });

    toast.success("Successfully Joined Workspace !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    getDoc(workspaceRef).then((s) => {
      s.data().members.map((id) => {
        if (user.uid === id) return;

        updateDoc(doc(db, "notification", id), {
          reminder: arrayUnion(
            "User " +
              userData.name +
              " joined the " +
              s.data().name +
              " workspace."
          ),
        });
      });
    });
  };

  const handleAccBoard = (bd) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      invite: arrayRemove({ board: bd.id }),
    });

    var boardRef = doc(db, "board", bd.id);

    if (boardRef)
      updateDoc(boardRef, {
        members: arrayUnion(user.uid),
      });

    toast.success("Successfully Joined Board !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDecBoard = (bd) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      invite: arrayRemove({ board: bd.id }),
    });

    toast.success("Declined Joined Board !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDec = (ws) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      invite: arrayRemove({ workspace: ws.id }),
    });

    toast.success("Declined Joined Workspace !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const deleteMsg = (msg) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      reminder: arrayRemove(msg),
    });

    toast.success("Notification Deleted !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDecWs = (ws) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      delete: arrayRemove(ws.id),
    });

    toast.success("Declined Deletion of Workspace !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAccWs = (ws) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      delete: arrayRemove(ws.id),
    });

    const wsRef = doc(db, "workspace", ws.id);

    updateDoc(wsRef, {
      delete: arrayUnion(user.uid),
    });

    toast.success("Accepted Deletion of Workspace !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    getDoc(wsRef).then((doc) => {
      if (doc.data().admins.length === doc.data().delete.length) {
        deleteDoc(wsRef);
      }
    });
  };

  return (
    <div className="min-h-[18rem]">
      {notifs.reminder &&
        notifs.reminder.map((msg) => {
          return (
            <div
              onClick={() => deleteMsg(msg)}
              key={msg}
              className="cursor-pointer p-4 border-gray-300 border-b h-full overflow-y-hidden "
            >
              <div className="mb-2">{msg}</div>
            </div>
          );
        })}

      {wslist.map((workspace, index) => {
        return (
          <div
            key={workspace + index}
            className="p-4 border-gray-300 border-b max-h-fit overflow-y-hidden "
          >
            <div className="mb-2">
              You have been invited to {workspace.name}
            </div>
            <button
              onClick={() => {
                handleAcc(workspace);
              }}
              className="bg-green-400 rounded py-1 px-3 text-white"
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleDec(workspace);
              }}
              className="bg-red-400 ml-2 rounded py-1 px-3 text-white"
            >
              Decline
            </button>
          </div>
        );
      })}

      {bdlist.map((board, index) => {
        return (
          <div
            key={board + index}
            className="p-4 border-gray-300 border-b max-h-fit overflow-y-hidden "
          >
            <div className="mb-2">You have been invited to {board.title}</div>
            <button
              onClick={() => {
                handleAccBoard(board);
              }}
              className="bg-green-400 rounded py-1 px-3 text-white"
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleDecBoard(board);
              }}
              className="bg-red-400 ml-2 rounded py-1 px-3 text-white"
            >
              Decline
            </button>
          </div>
        );
      })}

      {delList.map((workspace, index) => {
        return (
          <div
            key={workspace + index}
            className="p-4 border-gray-300 border-b max-h-fit overflow-y-hidden "
          >
            <div className="mb-2">Permission to delete {workspace.name}</div>
            <button
              onClick={() => {
                handleAccWs(workspace);
              }}
              className="bg-green-400 rounded py-1 px-3 text-white"
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleDecWs(workspace);
              }}
              className="bg-red-400 ml-2 rounded py-1 px-3 text-white"
            >
              Decline
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationComponent;
