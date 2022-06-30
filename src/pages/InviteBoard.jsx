import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  arrayUnion,
  query,
  where,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../middleware/AuthContext";

const auth = getAuth();

const InviteBoard = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const params = useParams();
  const ref = doc(db, "boardlink", params.id);
  var [boardRef, setBoardRef] = useState(null);
  const { user } = UserAuth();

  var prom;

  const colRef = collection(db, "boardlink");
  useEffect(() => {
    const snaps = onSnapshot(colRef, (docs) => {
      if (!docs.empty) {
        prom = docs.docs.map(async (snap) => {
          if (snap.empty) return;

          var diff = Timestamp.now().seconds - snap.data().timespace.seconds;

          if (diff > 86400) {
            deleteDoc(doc(db, "boardlink", snap.id));
          }
        });

        console.log(docs.docs[0].data());

        Promise.all(prom).then(() => {
          getDoc(ref).then((snap) => {
            if (snap.data() === undefined) return;

            boardRef = doc(db, "board", snap.data().board);
            setBoardRef(boardRef);

            getDoc(boardRef).then((data) => {
              setName(data.data().title);
            });
          });
        });
      }
    });

    return snaps;
  }, []);

  console.log(name);

  function join() {
    if (user) {
      if (boardRef)
        updateDoc(boardRef, {
          members: arrayUnion(auth.currentUser.uid),
        });
    }

    nav("/home");
  }

  return (
    <>
      {name ? (
        <div className="flex flex-col w-80 space-y-8">
          <p className="font-bold text-center">Join {name} Board</p>
          <button
            onClick={join}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
          >
            Join
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="font-bold">Error Invite Link !</p>
          <button
            onClick={() => [nav(-1)]}
            className="px-6 py-2 bg-blue-500 rounded-md w-full mt-3 text-sm font-semi-bold text-white"
          >
            Go back
          </button>
        </div>
      )}
    </>
  );
};

export default InviteBoard;
