import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const auth = getAuth();

const Member = (props) => {
  const [members, setMember] = useState([]);
  const [defaultAdmins, setDefaultAdmin] = useState([]);
  const params = useParams();
  const ref = doc(db, "workspace", params.id);

  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(ref, (snap) => {
        if (snap.data() === undefined) {
          return;
        }
        let m = [];
        setDefaultAdmin([...snap.data().admins]);

        var prom = snap.data().members.map(async (member) => {
          const q = doc(db, "user", member);
          const qSnap = await getDoc(q);

          if (qSnap.data().id === user.uid) {
            console.log(member);
            m.unshift({
              email: qSnap.data().name,
              id: qSnap.data().id,
            });
          } else {
            m.push({
              email: qSnap.data().name,
              id: qSnap.data().id,
            });
          }
        });

        Promise.all(prom).then(() => {
          setMember(m);
        });
      });
    } else {
      setMember([]);
    }
  }, []);

  let handler = (e) => {
    if (dropRef.current == null) return;
    if (!dropRef.current.contains(e.target)) {
      dropRef.current.classList.toggle("hidden");
      document.removeEventListener("mousedown", handler);
    }
  };

  const handleOnClick = (e, member, current_ref) => {
    dropRef.current = current_ref;
    dropRef.current.classList.toggle("hidden");
    document.addEventListener("mousedown", handler);
  };

  var dropRef = useRef();

  return (
    <>
      {members.map((member) => {
        var current_ref;

        return (
          <div
            key={member.id}
            className="!mt-1 relative p-2 border-gray-300 rounded border-2 flex w-full"
          >
            <p>{member.email}</p>
            {defaultAdmins.includes(member.id) ? (
              <>
                <p className="absolute right-0 pr-4 font-bold">Admin</p>
                {props.isMember || user.uid === member.id ? null : (
                  <div className="absolute  -right-12 pr-4 font-bold">
                    <svg
                      onClick={(e) => handleOnClick(e, member, current_ref)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 p-1 cursor-pointer hover:stroke-gray-700 relative"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                      />
                    </svg>
                    <div
                      ref={(ref) => {
                        current_ref = ref;
                      }}
                      className="hidden top-0 -right-[10rem] absolute w-40 text-xs  flex flex-col space-y-3 p-4 border shadow-md rounded"
                    >
                      <div className="">Demote to user ?</div>
                      <button
                        onClick={() => {
                          document.removeEventListener("mousedown", handler);
                          updateDoc(ref, {
                            admins: arrayRemove(member.id),
                          });
                        }}
                        className="w-full text-center bg-blue-500 rounded py-2 px-4 text-white"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="absolute right-0 pr-4 font-bold">Member</p>
                {props.isMember ? null : (
                  <div className="absolute  -right-12 pr-4 font-bold">
                    <svg
                      onClick={(e) => handleOnClick(e, member, current_ref)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 p-1 cursor-pointer hover:stroke-gray-700 relative"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 11l7-7 7 7M5 19l7-7 7 7"
                      />
                    </svg>
                    <div
                      ref={(ref) => {
                        current_ref = ref;
                      }}
                      className="hidden top-0 -right-[8rem] absolute w-32 text-xs  flex flex-col space-y-3 p-4 border shadow-md rounded"
                    >
                      <div className="">Make admin ?</div>
                      <button
                        onClick={() => {
                          document.removeEventListener("mousedown", handler);
                          updateDoc(ref, {
                            admins: arrayUnion(member.id),
                          });
                        }}
                        className="w-full text-center bg-blue-500 rounded py-2 px-4 text-white"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Member;
