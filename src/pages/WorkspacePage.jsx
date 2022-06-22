import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddWorkSpace from "../components/AddWorkSpace";
import BoardContainer from "../components/BoardContainer";
import Sidebar from "../components/Sidebar";
import Workspace from "../components/Workspace";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const WorkspacePage = () => {
  const params = useParams();

  const { user, nav } = UserAuth();
  const q = doc(db, "workspace", params.id);

  useEffect(() => {
    onSnapshot(q, (s) => {
      if (user.uid) {
        if (
          s.data().visibility === "private" &&
          !s.data().members.includes(user.uid)
        ) {
          console.log("Not Eligible to See Workspace");
          nav("/home");
        }
      }
    });
  }, [user]);

  return (
    <div className="">
      <div className="mt-24 w-screen h-fit">
        <div className="wrap px-16">
          <div className="!SIDEBAR fixed">
            <Sidebar />
            <div className="mt-4">
              <Workspace open={params.id} />
            </div>
          </div>
          <div className="pl-64">
            <BoardContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
