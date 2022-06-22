import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

const Comment = ({ comment, user_ref }) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    const ref = doc(db, "user", user_ref);

    onSnapshot(ref, (snap) => {
      if (snap) setState(snap.data());
      else setState(null);
    });
  });

  return (
    <>
      <div className="px-3 font-semibold text-blue-500">
        {state ? state.email : null}
      </div>
      <div className="text-sm mb-4 mt-1 w-full text-gray-700 border-gray-200 border-2 rounded-md px-3 py-1">
        {comment}
      </div>
    </>
  );
};

export default Comment;
