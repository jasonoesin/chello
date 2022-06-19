import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

const auth = getAuth();

const Member = (props) => {
  const [members, setMember] = useState([]);
  const [defaultAdmins, setDefaultAdmin] = useState([]);
  const params = useParams();
  const ref = doc(db, "workspace", params.id);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(ref).then((snap) => {
          if (snap.data() === undefined) {
            return;
          }
          let m = [];
          setDefaultAdmin([...snap.data().admins]);

          snap.data().members.map((member) => {
            const q = query(collection(db, "user"), where("id", "==", member));

            const data = getDocs(q).then((pass) => {
              pass.docs.map((doc) => {
                var text = doc.data().email;
                m.push({
                  email: text,
                  id: doc.data().id,
                });
                setMember(m);
              });
            });
            // let test = data.docs.map((doc) => ({
            //   ...doc.data(),
            //   id: doc.id,
            // }));
          });
        });
      } else {
        setMember([]);
      }
    });
  }, []);

  return (
    <>
      {members.map((member) => {
        return (
          <div
            key={member.id}
            className="!mt-1 relative p-2 border-gray-300 rounded border-2 flex w-full"
          >
            <p>{member.email}</p>
            {defaultAdmins.includes(member.id) ? (
              <p className="absolute right-0 pr-4 font-bold">Admin</p>
            ) : (
              <p className="absolute right-0 pr-4 font-bold">Member</p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Member;
