import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import Comment from "./Comment";

const CommentRenderer = (props) => {
  const [comments, setComments] = useState([]);
  const colRef = doc(db, "card", props.card);

  useEffect(() => {
    onSnapshot(colRef, (snap) => {
      if (snap) {
        setComments(snap.data().comments);
      } else setComments([]);
    });
  }, []);

  return (
    <>
      <p className="p-2 text-md mb-2 mt-10 font-medium">Card Comments</p>
      <div className="group relative">
        <textarea
          className=" transition-all duration-300 ease-out border-2 p-2 border-gray-200 shadow rounded-md w-full h-20 group-hover:h-32"
          type="text"
          placeholder="Write a comment..."
        ></textarea>
        <button className="hidden group-hover:block left-3 absolute bottom-4 px-3 py-1 bg-blue-300 rounded-md text-white">
          Comment
        </button>
      </div>
      {comments.map(({ comment, user }) => {
        return <Comment comment={comment} user_ref={user} />;
      })}

      <div className="px-3 font-semibold text-blue-500">User Name</div>
      <div className="text-sm mb-4 mt-1 w-full text-gray-700 border-gray-200 border-2 rounded-md px-3 py-1">
        Comment Test
      </div>
    </>
  );
};

export default CommentRenderer;
