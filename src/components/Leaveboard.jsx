import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { toast } from "react-toastify";

const LeaveBoard = (props) => {
  const [modal, setModal] = useState(false);
  const params = useParams();
  const nav = useNavigate();
  let menuRef = useRef();

  const ref = doc(db, "board", params.id);

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current == null) return;
      if (!menuRef.current.contains(e.target)) setModal(false);
    };
    document.addEventListener("mousedown", handler);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.empty) {
        if (snap.data().members.length === 1) {
          setSolo(true);
        }
      }
    });

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [solo, setSolo] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setModal(true);
        }}
        className=" text-left underline text-red-600 underline-offset-4 cursor-pointer"
      >
        Leave Board
      </button>

      {modal ? (
        <div
          ref={menuRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="!PARENT p-12 w-96 h-fit bg-white rounded-lg border drop-shadow-xl">
            <p className="font-bold mb-4">Leave Workspace?</p>
            <form action="" className="addBoard">
              <div className="space-y-6">
                <div className="">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-gray-600 block"
                  >
                    Are you sure you want to leave this Board ?
                  </label>
                </div>
              </div>

              <div>
                {solo ? (
                  <div className="flex justify-between">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const ref = doc(db, "board", params.id);

                        await getDoc(ref).then((cb) => {
                          const newRef = doc(db, "closedboard", params.id);
                          setDoc(newRef, { ...cb.data() });
                        });

                        deleteDoc(ref);
                        nav("/home");
                      }}
                      className="mt-10 flex justify-center 
                hover:bg-red-500
                bg-red-600 p-2 rounded text-white"
                    >
                      Close Board
                    </button>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const ref = doc(db, "board", params.id);
                        deleteDoc(ref);
                        nav("/home");
                      }}
                      className="mt-10 flex justify-center 
              hover:bg-red-500
              bg-red-600 p-2 rounded text-white"
                    >
                      Delete Board
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      if (props.isMember !== undefined && !props.isMember) {
                        await getDoc(ref).then((snap) => {
                          if (snap.data().members.length === 1) {
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
                    Leave Board
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LeaveBoard;
