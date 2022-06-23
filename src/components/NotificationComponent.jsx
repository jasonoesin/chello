import { data } from "autoprefixer";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";
import { GetNotif } from "../notification/NotifContext";

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
    console.log(ws.id);
    updateDoc(colRef, {
      invite: arrayRemove({ workspace: ws.id }),
    });
  };

  return (
    <div className="min-h-[18rem]">
      {wslist.map((workspace, index) => {
        return (
          <div className="p-4 border-gray-300 border-b max-h-fit overflow-y-hidden ">
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
            <button className="bg-red-400 ml-2 rounded py-1 px-3 text-white">
              Decline
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationComponent;
