import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const auth = getAuth();

const Settings = () => {
  const [fileUpload, setfileUpload] = useState(null);

  const { user } = UserAuth();
  const [state, setState] = useState([]);

  useEffect(() => {
    var unsub;
    if (user.uid) {
      const q = query(collection(db, "user"), where("id", "==", user.uid));

      unsub = onSnapshot(q, (snap) => {
        setState(snap.docs[0].data());
      });
    }

    return unsub;
  }, [user]);

  const imageRef = ref(storage, `user-profiles/${user.uid}/`);

  const submit = (e) => {
    e.preventDefault();
    updateDoc(doc(db, "user", user.uid), {
      name: e.target.name.value,
      bio: e.target.bio.value,
    });

    toast.success("Successfully Edit Profile !", {
      position: "bottom-right",

      autoClose: 3500,

      hideProgressBar: false,

      closeOnClick: true,

      pauseOnHover: true,

      draggable: true,

      progress: undefined,
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-0">EMTPY DIV</div>
      <div className="mt-24 w-screen h-fit">
        <div className="px-16 flex justify-center ">
          <div className="flex flex-col justify-center w-2/5 space-y-5 relative">
            <div className="">Profile and visibility</div>
            <div className="">
              Manage your personal information, and control which information
              other people see and apps may access.
            </div>
            <div className="font-bold">Profile Photo</div>
            <div className="flex flex-row justify-around p-10 relative">
              <div className="">
                <input
                  onChange={(e) => {
                    setfileUpload(e.target.files[0]);
                  }}
                  className="bg-black h-[8.5rem] w-[8.5rem] top-10 left-16  absolute rounded-full opacity-0 cursor-pointer"
                  type="file"
                  name="myImage"
                  accept="image/*"
                />
                <img
                  className="w-2/3 rounded-full border border-white hover:opacity-90 cursor-pointer"
                  src="https://i.picsum.photos/id/66/200/200.jpg?hmac=gaKXe-rWmo5fSEm79TTkW_yFJLECw3FdRCh6Dm7jp4g"
                  alt=""
                />
              </div>
              <div className="flex items-center text-gray-400 font-bold">
                {user.email}
              </div>
            </div>

            <p className="font-bold">About</p>
            <hr className="border-none h-0.5 bg-gray-200 rounded" />
            <form className="space-y-5" onSubmit={submit}>
              <div className="flex items-center">
                <label htmlFor="" className="text-gray-600 font-medium grow">
                  Name
                </label>
                <input
                  name="name"
                  className="w-1/2 text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
                  type="text"
                  placeholder="Name"
                  defaultValue={state.name}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="" className="text-gray-600 font-medium grow">
                  Bio
                </label>
                <textarea
                  name="bio"
                  className="w-1/2 text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
                  placeholder="Input your bio..."
                  defaultValue={state.bio}
                />
              </div>

              <div
                onClick={() => {
                  setOpen(!open);
                }}
                className="text-red-600 hover:text-red-700 cursor-pointer font-bold w-1/3 rounded py-2 absolute"
              >
                Change Password
              </div>

              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="text-white cursor-pointer bg-blue-600 w-1/3 rounded py-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          {open ? (
            <div className="fixed inset-0 z-[100] bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
              <div className="bg-white p-10 rounded w-1/2 h-fit absolute z-[100] space-y-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 right-5 absolute z-[100] cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>

                <form
                  className="!mt-10 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (e.target.curr.value === e.target.newpass.value) {
                      toast.error("Please input a new password !", {
                        position: "bottom-right",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      return;
                    }

                    signInWithEmailAndPassword(
                      auth,
                      user.email,
                      e.target.curr.value
                    )
                      .then((userCredential) => {
                        updatePassword(user, e.target.newpass.value)
                          .then(() => {
                            toast.success("Password changed !", {
                              position: "bottom-right",
                              autoClose: 3500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          })
                          .catch((error) => {
                            toast.error(error, {
                              position: "bottom-right",
                              autoClose: 3500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          });
                      })
                      .catch((error) => {
                        toast.error("Wrong password !", {
                          position: "bottom-right",
                          autoClose: 3500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      });
                  }}
                >
                  <div className="flex items-center">
                    <label
                      htmlFor=""
                      className="text-gray-600 font-medium grow"
                    >
                      Current Password
                    </label>
                    <input
                      name="curr"
                      className="w-1/2 text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
                      type="password"
                      placeholder="Insert current password"
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor=""
                      className="text-gray-600 font-medium grow"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newpass"
                      className="w-1/2 text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
                      placeholder="Input your new password"
                    />
                  </div>

                  <div className="w-full flex justify-end">
                    <button
                      type="submit"
                      className="text-white cursor-pointer bg-blue-600 w-1/3 rounded py-2"
                    >
                      Commit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Settings;
