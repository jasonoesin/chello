import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const Comment = ({ comment, user_ref, card }) => {
  const [state, setState] = useState({});
  const { user } = UserAuth();

  useEffect(() => {
    const ref = doc(db, "user", user_ref);

    onSnapshot(ref, (snap) => {
      if (snap) setState(snap.data());
      else setState({});
    });
  });

  return (
    <div className="relative">
      <div className="px-3 font-semibold text-blue-500">
        {state ? state.name : null}
      </div>
      <div className="absolute top-0 right-0 px-3 font-semibold text-blue-300 text-sm cursor-pointer">
        {user.email === state.email && (
          <p
            onClick={() => {
              const colRef = doc(db, "card", card);

              updateDoc(colRef, {
                comments: arrayRemove({
                  comment: comment,
                  user: user_ref,
                }),
              });
            }}
            className=""
          >
            {" "}
            Delete Comment
          </p>
        )}
      </div>
      <div className="text-sm mb-1 mt-1 w-full text-gray-700 border-gray-200 border-2 rounded-md px-3 py-1">
        {comment}
      </div>
    </div>
  );
};

export default Comment;
