import { useEffect } from "react";
import LabelColor from "./LabelColor";
import { db } from "../firebase-config";
import { useState } from "react";
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRef } from "react";
import LabelRender from "./LabelRender";
import CheckListRender from "./ChecklistRender";
import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import CardFileAttach from "./CardFileAttach";
import CardLink from "./CardLink";
import CommentRenderer from "./CommentRenderer";

const CardDetail = (props) => {
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"]],
  };

  const { quill, quillRef } = useQuill({ modules });
  const [data, setData] = useState([]);
  var curr = data;

  var ref = useRef();
  var ref2 = useRef();
  var array = useRef([]);

  const colRef = doc(db, "card", props.current.id);

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      setData(snapshot.data());
    });

    return unsub;
  }, []);

  const handleChangeTitle = (e) => {
    if (e.key === "Enter") {
      updateDoc(doc(db, "card", props.current.id), {
        title: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(
        curr.desc ? curr.desc : "Add a more detailed description"
      );
    }
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (e) => {
        // console.log(quill.root.innerHTML);
        // console.log(quillRef.current.firstChild.innerHTML);
        if (e.ops[1].insert && e.ops[1].insert === "\n") {
          updateDoc(doc(db, "card", props.current.id), {
            desc: quill.root.innerHTML,
          });
        }
      });
    }
  }, [quill]);

  return (
    <>
      <div className="backdrop-blur-sm z-30 inset-0 bg-black bg-opacity-30 h-screen flex justify-center  overflow-y-scroll p-28 fixed">
        <div className="bg-white p-10 rounded w-2/3 min-h-[33rem] h-fit relative">
          <svg
            onClick={() => {
              props.handle("");
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute cursor-pointer right-4 top-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="!DIVIDER flex">
            <div className="!LEFT flex flex-col grow">
              <input
                onKeyDown={(e) => {
                  handleChangeTitle(e, curr);
                }}
                defaultValue={curr.title}
                className="p-2 text-2xl"
              ></input>
              {curr.labels ? (
                <div className="flex">
                  {curr.labels.map((label) => {
                    return (
                      <div
                        key={label}
                        className={`h-2 w-10 ${label} rounded-md mt-1 ml-3`}
                      ></div>
                    );
                  })}
                </div>
              ) : null}
              <p className="p-2 text-md font-medium">Card Description</p>
              <div className="mb-12" style={{ width: "100%", height: 125 }}>
                <div className="bg-gray-100 " ref={quillRef} />
              </div>
              {/* <div className="p-2">
                <textarea
                  onKeyDown={handleChangeDesc}
                  id="textarea"
                  className="p-4 focus:outline-none h-32 bg-gray-100 resize-none w-full overflow-y-hidden "
                  type="text"
                  defaultValue={curr.desc ? curr.desc : null}
                  placeholder={"Add a more detailed description"}
                />
              </div> */}
              <CheckListRender card={props.current.id} />
              <CardFileAttach card={props.current.id} />
              <CommentRenderer card={props.current.id} />
            </div>

            <div className="ml-8 !RIGHT w-40 text-sm text-gray-600  ">
              <p className="p-2"> Add to Card</p>
              <div
                onClick={() => {
                  ref.current.classList.toggle("hidden");
                }}
                className="!LABEL relative p-2 flex bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#4b5563"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <p className="ml-2">Labels</p>
              </div>

              <div
                ref={ref}
                className="hidden z-30 !CLICKED_LABEL bg-white border-gray-50 border rounded drop-shadow-xl h-fit absolute w-64"
              >
                <p className="w-full text-center p-3">Labels</p>

                {/* <LabelRender /> */}

                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-green-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-yellow-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-orange-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-red-400"
                />
                <LabelColor
                  curr_id={props.current.id}
                  curr={curr.labels}
                  color="bg-blue-400"
                />
                <div className="py-3 px-2  text-gray-500">
                  <button
                    onClick={() => {
                      ref.current.classList.toggle("hidden");
                      ref2.current.classList.toggle("hidden");
                    }}
                    className="bg-gray-50 w-full rounded h-8 hover:bg-gray-200"
                  >
                    Create a new label
                  </button>
                </div>
              </div>

              <div
                ref={ref2}
                className=" hidden z-50 !CUSTOM_LABEL bg-white border-gray-50 border rounded drop-shadow-xl h-52 absolute  w-64  flex-col  text-xs"
              >
                <svg
                  onClick={() => {
                    ref.current.classList.toggle("hidden");
                    ref2.current.classList.toggle("hidden");
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 absolute w-4 top-4 left-2 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <p className="w-full text-center p-3 text-sm">
                  Create a new Label
                </p>
                <label className="px-3 py-1" htmlFor="">
                  Name
                </label>
                <div className="px-3">
                  <input
                    className="p-3 w-full h-[2rem] border-2 rounded "
                    type="text"
                  />
                </div>
                <p className="px-3 py-1 mt-1">Select a color</p>
                <div className="px-3">
                  <input
                    type="color"
                    id="favcolor"
                    name="favcolor"
                    defaultValue="#ff0000"
                  ></input>
                </div>

                <div className="px-3">
                  <button className="px-3 py-2 bg-blue-500 rounded text-white absolute bottom-3">
                    Create
                  </button>
                </div>
              </div>

              <div
                onClick={async () => {
                  await getDoc(doc(db, "card", props.current.id)).then(
                    (snap) => {
                      if (snap.data().checklist)
                        array.current = snap.data().checklist;
                      else array.current = [];
                    }
                  );

                  array.current.push({
                    name: "Checklist",
                    items: [],
                  });

                  updateDoc(doc(db, "card", props.current.id), {
                    checklist: array.current,
                  });
                }}
                className="!CHECKLIST relative p-2 mt-2 flex bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer"
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <p className="ml-2">Checklist</p>
              </div>

              <div
                onClick={() => {
                  props.handle("");
                  deleteDoc(doc(db, "card", props.current.id));
                }}
                className="!ARCHIVE relative p-2 mt-2 flex bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer"
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <p className="ml-2">Archive</p>
              </div>

              <CardLink card={props.current.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
