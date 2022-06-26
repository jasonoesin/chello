import { data } from "autoprefixer";
import {
  arrayRemove,
  arrayUnion,
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
  const { notifs } = GetNotif();
  const { user } = UserAuth();

  useEffect(() => {
    if (notifs !== undefined)
      if (notifs.invite !== undefined) {
        // console.log(notifs.invite);

        let w = [];

        var prom = notifs.invite.map(async ({ workspace }) => {
          await getDoc(doc(db, "workspace", workspace)).then((dat) => {
            w.push({ ...dat.data(), id: dat.id });
          });
        });

        Promise.all(prom).then(() => {
          setWslist(w);
        });
      }
  }, [notifs]);

  const handleAcc = (ws) => {
    const colRef = doc(db, "notification", user.uid);
    updateDoc(colRef, {
      invite: arrayRemove({ workspace: ws.id }),
    });

    var workspaceRef = doc(db, "workspace", ws.id);

    console.log("masuk");

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
    </div>
  );
};

export default NotificationComponent;
