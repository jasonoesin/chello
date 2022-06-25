import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const Settings = () => {
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
                <img
                  className="w-2/3 rounded-full border border-white"
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
            <div className="flex items-center">
              <label htmlFor="" className="text-gray-600 font-medium grow">
                Name
              </label>
              <input
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
                className="w-1/2 text-sm font-normal p-2 bg-transparent border-2 border-gray-500 rounded-md"
                placeholder="Input your bio..."
                defaultValue={state.bio}
              />
            </div>

            <div className="w-full flex justify-end">
              <button className="text-white cursor-pointer bg-blue-600 w-1/3 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
