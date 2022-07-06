import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";
import Comment from "./Comment";

const CommentRenderer = (props) => {
  const [comments, setComments] = useState([]);
  const colRef = doc(db, "card", props.card);

  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(colRef, (snap) => {
      if (snap.data().comments) {
        setComments(snap.data().comments);
      } else setComments([]);
    });
  }, []);

  const submitComment = (e) => {
    e.preventDefault();
    updateDoc(colRef, {
      comments: arrayUnion({
        comment: e.target.text.value,
        user: user.uid,
      }),
    });
  };

  return (
    <>
      <p className="p-2 text-md mb-2 mt-10 font-medium">Card Comments</p>

      {props.isMember ? (
        <div className="group relative">
          <form onSubmit={submitComment}>
            <textarea
              name="text"
              className=" transition-all duration-300 ease-out border-2 p-2 border-gray-200 shadow rounded-md w-full h-20 group-hover:h-32"
              type="text"
              placeholder="Write a comment..."
            ></textarea>
            <button className="hidden group-hover:block left-3 absolute bottom-4 px-3 py-1 bg-blue-300 rounded-md text-white">
              Comment
            </button>
          </form>
        </div>
      ) : null}

      {comments.map(({ comment, user }) => {
        return (
          <Comment
            key={comment + user}
            comment={comment}
            user_ref={user}
            card={props.card}
          />
        );
      })}
    </>
  );
};

export default CommentRenderer;
