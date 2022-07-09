import { async } from "@firebase/util";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { db } from "../firebase-config";

const Checklist = (props) => {
  const parentIndex = props.index;

  const handleDelete = async () => {
    const data = await getDoc(doc(db, "card", props.card));

    if (data.data().checklist.length === 1) {
      updateDoc(doc(db, "card", props.card), {
        checklist: [],
      });
      return;
    }

    const newChecklist = data.data().checklist;

    newChecklist.splice(props.index, 1);

    updateDoc(doc(db, "card", props.card), {
      checklist: newChecklist,
    });
  };

  const handleAdd = async () => {
    const data = await getDoc(doc(db, "card", props.card));

    const newChecklist = data.data().checklist;

    newChecklist[props.index].items.push({
      data: "Item",
      done: false,
    });

    updateDoc(doc(db, "card", props.card), {
      checklist: newChecklist,
    });
  };

  return (
    <Fragment>
      <div className="mt-1 px-3 flex items-center">
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="p-3 grow">{props.name}</p>
        <button
          onClick={handleDelete}
          className="px-4 py-1 bg-blue-400 rounded text-white"
        >
          Delete
        </button>
      </div>

      <div className="p-3">
        <Bar card={props.card} parentIndex={parentIndex} />
        {props.items &&
          props.items.map((item, index) => {
            return (
              <List
                key={item + index}
                parentIndex={parentIndex}
                card={props.card}
                item={item}
                index={index}
              />
            );
          })}

        <button
          onClick={handleAdd}
          className="p-2 w-32 mt-2 bg-blue-400 rounded text-white"
        >
          Add an Item
        </button>
      </div>
    </Fragment>
  );
};

const Bar = (props) => {
  const [state, setState] = useState(0);
  var newClass = `bg-green-400 w-[${state}%] h-2 rounded-xl relative`;
  (async () => {
    await getDoc(doc(db, "card", props.card)).then((doc) => {
      const newChecklist = doc.data().checklist[props.parentIndex];
      const total = newChecklist.items.length;
      var d = 0;

      if (total === 0) return;

      var prom = newChecklist.items.map(async ({ done }) => {
        if (done === true) d++;
        return;
      });

      Promise.all(prom).then(() => {
        const per = Math.round((d / total) * 100);

        setState(per);
      });
    });
  })();
  console.log(newClass);

  return (
    <>
      <div className="bg-gray-400 w-full h-2 rounded-xl relative">
        <div className={newClass}></div>
      </div>
    </>
  );
};

const List = (props) => {
  const item = props.item;
  const index = props.index;

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      //   updateDoc(doc(db, "card", props.card), {
      //     title: e.target.value,
      //   });

      (async () => {
        await getDoc(doc(db, "card", props.card)).then((d) => {
          const newChecklist = d.data().checklist;
          const currItem = d.data().checklist[props.parentIndex].items[index];
          newChecklist[props.parentIndex].items[index] = {
            ...newChecklist[props.parentIndex].items[index],
            data: e.target.value,
          };

          updateDoc(doc(db, "card", props.card), {
            checklist: newChecklist,
          });
        });
      })();
    }
  };

  return (
    <div className="flex items-center">
      {item.done && (
        <svg
          onClick={async () => {
            const data = await getDoc(doc(db, "card", props.card));

            const newChecklist = data.data().checklist;

            newChecklist[props.parentIndex].items[index] = {
              ...newChecklist[props.parentIndex].items[index],
              done: !newChecklist[props.parentIndex].items[index].done,
            };

            updateDoc(doc(db, "card", props.card), {
              checklist: newChecklist,
            });
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute stroke-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}

      <div
        onClick={async () => {
          const data = await getDoc(doc(db, "card", props.card));

          const newChecklist = data.data().checklist;

          newChecklist[props.parentIndex].items[index] = {
            ...newChecklist[props.parentIndex].items[index],
            done: !newChecklist[props.parentIndex].items[index].done,
          };

          updateDoc(doc(db, "card", props.card), {
            checklist: newChecklist,
          });
        }}
        className="w-5 h-5 bg-slate-300 rounded"
      />

      <div className="py-4 px-4 w-full relative">
        <input
          onKeyDown={(e) => {
            handleChange(e);
          }}
          defaultValue={item.data}
          type=" text"
          className="bg-gray-50 p-2 text-gray-600 w-1/2"
        ></input>
        <button
          onClick={async () => {
            const data = await getDoc(doc(db, "card", props.card));

            const newChecklist = data.data().checklist;

            newChecklist[props.parentIndex].items.splice(index, 1);

            updateDoc(doc(db, "card", props.card), {
              checklist: newChecklist,
            });
          }}
          className="px-4 py-1 absolute right-0 bg-gray-400 rounded text-white text-sm top-6 hover:bg-gray-500"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default Checklist;
