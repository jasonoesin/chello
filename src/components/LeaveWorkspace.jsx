import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { toast } from "react-toastify";

const LeaveWorkspace = (props) => {
  const [modal, setModal] = useState(false);
  const params = useParams();
  const nav = useNavigate();
  let menuRef = useRef();

  const ref = doc(db, "workspace", params.id);

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current == null) return;
      if (!menuRef.current.contains(e.target)) setModal(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <button
        onClick={() => {
          setModal(true);
        }}
        className=" text-left underline text-red-600 underline-offset-4 cursor-pointer"
      >
        Leave Workspace
      </button>

      {modal ? (
        <div
          ref={menuRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="!PARENT p-12 w-96 h-[18rem] bg-white rounded-lg border drop-shadow-xl">
            <p className="font-bold mb-4">Leave Workspace?</p>
            <form action="" className="addBoard">
              <div className="space-y-6">
                <div className="">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-gray-600 block"
                  >
                    Are you sure you want to leave this Workspace ?
                  </label>
                </div>
              </div>

              <div>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    if (props.isMember !== undefined && !props.isMember) {
                      await getDoc(ref).then((snap) => {
                        if (snap.data().members.length === 1) {
                          const colRef = collection(db, "board");
                          const q = query(
                            colRef,
                            where("workspace", "==", params.id)
                          );

                          getDocs(q).then((docs) => {
                            docs.docs.map((cb) => {
                              const newRef = doc(db, "closedboard", cb.id);
                              setDoc(newRef, { ...cb.data() });
                              deleteDoc(doc(db, "board", cb.id));
                            });
                          });

                          deleteDoc(ref);
                          nav("/home");
                        } else if (
                          snap.data().members.length > 1 &&
                          snap.data().admins.length == 1
                        ) {
                          toast.error(
                            "You must grant at least 1 other member an Admin role !",
                            {
                              position: "bottom-right",
                              autoClose: 3500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            }
                          );
                        } else {
                          updateDoc(ref, {
                            members: arrayRemove(props.user),
                            admins: arrayRemove(props.user),
                          });

                          nav("/home");
                        }
                      });
                      return;
                    }

                    updateDoc(ref, {
                      members: arrayRemove(props.user),
                    });

                    nav("/home");
                  }}
                  className="mt-10 w-fit flex justify-center 
            hover:bg-red-500
            bg-red-600 p-2 rounded text-white"
                >
                  Leave Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LeaveWorkspace;
