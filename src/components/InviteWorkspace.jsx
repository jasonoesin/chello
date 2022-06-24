import { useEffect, useRef } from "react";
import GenerateLink from "./GenerateLink";

import { useState } from "react";
import { db } from "../firebase-config";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Select from "react-select";
import { UserAuth } from "../middleware/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const InviteWorkspace = (props) => {
  const [options, setOptions] = useState([]);
  const colRef = collection(db, "user");
  const params = useParams();

  const { user } = UserAuth();

  useEffect(() => {
    const snaps = onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        let b = [];
        snapshot.docs.forEach((doc) => {
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

  const handleChange = (e) => {
    selectRef.current = e.value;
  };

  const buttonRef = useRef();
  const selectRef = useRef();

  const handleFocus = () => {
    buttonRef.current.classList.remove("hidden");
  };

  const handleBlur = (e) => {
    if (selectRef.current === "") buttonRef.current.classList.add("hidden");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-10 rounded w-1/3 h-1/10 absolute space-y-3 ">
        <div className="text-xl relative">
          <button className="relative">Invite to workspace</button>

          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 top-1 right-0 absolute cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                props.onClose();
              }}
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <Select
          ref={selectRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          options={options}
        />

        <button
          onClick={() => {
            const colRef = doc(db, "notification", selectRef.current);

            console.log(colRef);

            updateDoc(colRef, {
              invite: arrayUnion({
                workspace: params.id,
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
          }}
          ref={buttonRef}
          className="bg-blue-300 px-5 py-2 rounded hidden text-sm absolute right-10 text-white"
        >
          Invite
        </button>
        <div className="">
          <p>Share this workspace with a link</p>
          <GenerateLink />
        </div>
      </div>
    </div>
  );
};

export default InviteWorkspace;
