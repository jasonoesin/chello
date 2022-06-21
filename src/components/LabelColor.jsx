import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const LabelColor = (props) => {
  var stringClass = `w-52 h-6 ${props.color} rounded-sm hover:border-2 hover:border-gray-300 relative`;
  const colRef = doc(db, "card", props.curr_id);

  return (
    <>
      <div className="px-2 py-1 flex items-center justify-center cursor-pointer">
        <div
          onClick={() => {
            if (!(props.curr && props.curr.includes(props.color)))
              updateDoc(colRef, {
                labels: arrayUnion(props.color),
              });
            else {
              updateDoc(colRef, {
                labels: arrayRemove(props.color),
              });
            }
          }}
          className={stringClass}
        >
          {props.curr && props.curr.includes(props.color) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-white absolute right-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : null}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 flex grow "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
    </>
  );
};

export default LabelColor;
