import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  setDoc,
  doc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

function gen() {
  return Math.random().toString(36).substring(2, 7);
}

const GenerateLink = () => {
  const [link, setLink] = useState([]);
  const params = useParams();
  const colRef = collection(db, "link");
  const q = query(colRef, where("workspace", "==", params.id));

  useEffect(() => {
    const snaps = onSnapshot(q, (docs) => {
      if (!docs.empty) {
        let b = [];
        docs.docs.forEach((snap) => {
          var diff = Timestamp.now().seconds - snap.data().timespace.seconds;

          if (diff < 86400) {
            b.push({ ...snap.data(), id: snap.id });
          } else {
            deleteDoc(doc(db, "link", snap.id));
          }
        });

        setLink(b);
      } else {
        setLink([]);
      }
    });

    return snaps;
  }, []);

  return (
    <>
      {link.length != 0 ? (
        <p className="italic text-sm text-gray-500">
          {"invite-workspace/" + link[0].id}
        </p>
      ) : (
        <p
          onClick={() => {
            setDoc(doc(db, "link", gen()), {
              timespace: serverTimestamp(),
              workspace: params.id,
            });
          }}
          className="cursor-pointer text-sm underline underline-offset-2 text-gray-400"
        >
          Create link
        </p>
      )}
    </>
  );
};

export default GenerateLink;
