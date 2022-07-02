import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BigCalendar from "../components/BigCalendar";
import ListContainer from "../components/ListContainer";
import Sidebar from "../components/Sidebar";
import Workspace from "../components/Workspace";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const BoardCalendar = () => {
  const params = useParams();
  const boardRef = doc(db, "board", params.id);
  // const workRef = doc(db, "workspace", params.id);
  const location = useLocation();
  const { user, nav } = UserAuth();
  const [isMember, setIsMember] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    onSnapshot(boardRef, (s) => {
      if (user.uid) {
        setData({ ...s.data(), id: s.id });
        // VALIDASI APAKAH BOARD MEMBER

        if (s.data().members.includes(user.uid)) {
          setIsMember(true);
          return;
        }

        if (s.data().visibility === "board") {
          console.log("Not Eligible to See Board");
          nav("/home");
          return;
        }

        // VALIDASI APAKAH WORKSPACE MEMBER DAN VISIBILITY WORKSPACE
        if (s.data().visibility === "workspace") {
          const workRef = doc(db, "workspace", s.data().workspace);
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

        // VALIDASI APAKAH PUBLIC (BERARTI BUKAN BOARD MEMBER)

        if (s.data().visibility === "public") {
          setIsMember(false);
          return;
        }

        setIsMember(false);
      }
    });
  }, [user, location]);

  return (
    <div className="">
      <div className="h-0">EMTPY DIV</div>
      <div className="mt-24 w-screen h-fit">
        <div className="wrap px-16">
          <div className="!SIDEBAR fixed z-50">
            <Sidebar />
            <div className="mt-4">
              <Workspace open={params.id} />
            </div>
          </div>
          <div className="pl-64">
            <BigCalendar isMember={isMember} board={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCalendar;
