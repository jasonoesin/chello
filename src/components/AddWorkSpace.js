import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../middleware/AuthContext";
import Select from "react-select";
import { toast } from "react-toastify";

const auth = getAuth();

const AddWorkSpace = (props) => {
  const colRef = collection(db, "workspace");
  const [options, setOptions] = useState([]);
  const userRef = collection(db, "user");
  const [skip, setSkip] = useState(true);

  const { user } = UserAuth();

  useEffect(() => {
    const addForm = document.querySelector(".addWorkspace");
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addDoc(colRef, {
        name: addForm.wsName.value,
        desc: addForm.wsDesc.value,
        members: [user.uid],
        admins: [user.uid],
        visibility: "private",
      });

      (async () => {
        const q = query(
          collection(db, "workspace"),
          where("name", "==", addForm.wsName.value)
        );

        await getDocs(q).then((snap) => {
          createdWorkspace.current = {
            ...snap.docs[0].data(),
            id: snap.docs[0].id,
          };
        });
      })();

      // props.onClose();
      ref1.current.classList.toggle("hidden");
      ref2.current.classList.toggle("hidden");
    });
  }, [user]);

  useEffect(() => {
    const snaps = onSnapshot(userRef, (snapshot) => {
      if (!snapshot.empty) {
        let b = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().id === user.uid) return;

          b.push({
            value: doc.data().id,
            label: doc.data().email,
          });
        });

        setOptions(b);
      } else {
        setOptions([]);
      }
    });

    return snaps;
  }, []);

  const ref1 = useRef();
  const ref2 = useRef();
  const selectedRef = useRef();
  const createdWorkspace = useRef();

  const handleChange = (e) => {
    if (e.value) setSkip(false);
    selectedRef.current = e.value;
  };

  return (
    <>
      <div
        ref={ref1}
        className="fixed inset-0 z-[100] bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white p-10 rounded w-1/2 h-3/4 absolute z-[100] space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 right-5 absolute z-[100] cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              props.onClose();
            }}
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>

          <p className="font-bold">Let's build a Workspace</p>
          <p>
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </p>
          <form action="" className="addWorkspace">
            <div className="space-y-6">
              <div className="">
                <label
                  htmlFor=""
                  className="text-sm font-bold text-gray-600 block"
                >
                  Workspace's Name
                </label>
                <input
                  name="wsName"
                  type="text"
                  className="w-1/2 p-2 border border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor=""
                  className="text-sm font-light text-gray-400 block"
                >
                  This is the name of your new Workspace.
                </label>
              </div>
              <div className="h-28">
                <label
                  htmlFor=""
                  className="text-sm font-bold text-gray-600 block"
                >
                  Workspace's Description
                </label>
                <textarea
                  name="wsDesc"
                  type="text"
                  className="w-1/2 p-2 border border-gray-300 rounded mt-1 h-full resize-none"
                />
                <label
                  htmlFor=""
                  className="text-sm font-light text-gray-400 block"
                >
                  Get your members on board with a few words about your
                  Workspace.
                </label>
              </div>
            </div>

            <div>
              <button
                className="mt-24 w-full flex justify-center 
            hover:bg-blue-600
            bg-blue-500 p-2 rounded text-white"
              >
                Create Workspace
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        ref={ref2}
        className=" hidden fixed inset-0 z-[100] bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white p-10 rounded w-1/2 h-1/2 absolute z-[100] space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 right-5 absolute z-[100] cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              props.onClose();
            }}
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p className="font-bold">Invite your team to workspace</p>
          <p>
            CHello makes teamwork your best work. Invite your new team members
            to get going!
          </p>
          <div action="" className="inviteMember">
            <div className="space-y-6">
              <div className="">
                <label
                  htmlFor=""
                  className="text-sm font-bold text-gray-600 block"
                >
                  Invite your team
                </label>
                <Select
                  className="mt-2"
                  name="select"
                  // ref={selectRef}
                  // onBlur={handleBlur}
                  // onFocus={handleFocus}
                  onChange={handleChange}
                  options={options}
                />
              </div>
            </div>

            <div>
              {!skip ? (
                <button
                  onClick={async () => {
                    const notifRef = doc(
                      db,
                      "notification",
                      selectedRef.current
                    );

                    updateDoc(notifRef, {
                      invite: arrayUnion({
                        workspace: createdWorkspace.current.id,
                      }),
                    });

                    toast.success("Successfully Invited !", {
                      position: "bottom-right",
                      autoClose: 3500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });

                    props.onClose();
                  }}
                  className="mt-10 w-full flex justify-center 
            hover:bg-blue-600
            bg-blue-500 p-2 rounded text-white"
                >
                  Invite to Workspace
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    props.onClose();
                  }}
                  className="mt-10 w-full flex justify-center 
            hover:bg-gray-400
            bg-gray-300 p-2 rounded text-white"
                >
                  Skip this phase
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkSpace;
