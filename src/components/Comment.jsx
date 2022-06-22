import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const Comment = ({ comment, user_ref }) => {
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
    <>
      <div className="px-3 font-semibold text-blue-500">
        {state ? state.email : null}
      </div>
      <div className="text-sm mb-1 mt-1 w-full text-gray-700 border-gray-200 border-2 rounded-md px-3 py-1">
        {comment}
      </div>
      {user.email !== state.email ? (
        <div className="font-semibold mb-4 ml-3 cursor-pointer underline  text-xs text-gray-500">
          Reply
        </div>
      ) : (
        <div className="mb-4"></div>
      )}
    </>
  );
};

export default Comment;
