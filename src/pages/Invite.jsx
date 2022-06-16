import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
var u = null;

const Invite = () => {
  const [name, setName] = useState("");
  const params = useParams();
  const ref = doc(db, "workspace", params.id);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        u = user;
        getDoc(ref).then((snap) => {
          if (snap.data() === undefined) return;
          setName(snap.data().name);
        });
      }
    });
  }, []);

  function join() {
    if (u)
      updateDoc(ref, {
        members: arrayUnion(auth.currentUser.uid),
      });
    return;
  }

  return (
    <>
      {name ? (
        <div className="flex flex-col w-80 space-y-8">
          <p className="font-bold text-center">Join {name} Workspace</p>
          <button
            onClick={join}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
          >
            Join
          </button>
        </div>
      ) : (
        <p className="font-bold">Error Invite Link !</p>
      )}
    </>
  );
};

export default Invite;