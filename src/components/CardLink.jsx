import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";

const CardLink = (props) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (ref.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const [link, setLink] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "cardlink", props.card), (snap) => {
      if (snap.data()) setLink(snap.id);
      else setLink(false);
    });

    return unsub;
  }, []);

  return (
    <div ref={ref}>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="!SHARE relative p-2 mt-2 flex bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <p className="ml-2">Share Link</p>
      </div>

      {open ? (
        <div className="z-30 !CLICKED_LABEL bg-white border-gray-50 border rounded drop-shadow-xl h-fit absolute w-[21rem]">
          <p className="w-full text-center p-3">Card Link</p>

          <p className="w-full text-center p-3 italic semi-bold">
            {link ? (
              "card/" + link
            ) : (
              <div
                onClick={() =>
                  setDoc(doc(db, "cardlink", props.card), {
                    open: "true",
                  })
                }
                className="cursor-pointer underline underline-offset-2"
              >
                Generate Card Link ?
              </div>
            )}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default CardLink;
