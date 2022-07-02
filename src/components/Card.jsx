import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { Draggable } from "react-beautiful-dnd";

const Card = (props) => {
  const [cards, setCard] = useState([]);
  const colRef = collection(db, "card");

  const q = query(colRef, where("list", "==", props.list));

  useEffect(() => {
    const snaps = onSnapshot(q, (snaps) => {
      if (!snaps.empty) {
        let c = [];
        snaps.docs.forEach((doc) => {
          c.push({ ...doc.data(), id: doc.id });
        });
        setCard(c);
      } else {
        setCard([]);
      }
    });
  }, []);

  const dueDateColor = (val) => {
    if (val === undefined || val === "no") return "bg-gray-300";
    if (val === "yes") return "bg-green-300";
    else return "bg-red-300";
  };

  const createNewCard = (card, index) => {
    (async () => {
      // getDoc(doc(db, "card", d.id)).then((c) => {
      //   if (new Date() > new Date(c.data().duedate)) {
      //     updateDoc(doc(db, "card", d.id), {
      //       done: "due",
      //     });
      //   })

      getDoc(doc(db, "card", card.id)).then((c) => {
        if (new Date() > new Date(c.data().duedate)) {
          updateDoc(doc(db, "card", c.id), {
            done: "due",
          });
        }
      });
    })();

    if (props.isMember)
      return (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided, snapshot) => {
            return (
              <div
                style={{
                  ...provided.draggableProps.style,
                }}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={card.id}
              >
                <div
                  onClick={() => {
                    props.handle(props.list, card);
                  }}
                  style={{
                    transform: snapshot.isDragging ? "rotate(7deg)" : "",
                    backgroundColor: snapshot.isDragging
                      ? "rgb(241 245 249)"
                      : "#ffffff",
                  }}
                  className="p-2 w-full text-left bg-white rounded-sm border"
                >
                  {card.labels ? (
                    <div className="flex flex-wrap">
                      {card.labels.map((label) => {
                        return (
                          <div
                            key={card.id + label}
                            className={`h-2 w-10 ${label} rounded-md mt-1 ml-1`}
                          ></div>
                        );
                      })}
                    </div>
                  ) : null}

                  {card.title}

                  {card.duedate ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (card.done && card.done === "yes") {
                          updateDoc(doc(db, "card", card.id), {
                            done: "no",
                          });
                          return;
                        }

                        e.target.classList.remove("bg-gray-300");
                        e.target.classList.add("bg-green-300");

                        updateDoc(doc(db, "card", card.id), {
                          done: "yes",
                        });
                      }}
                      className={`text-gray-600 text-xs ${dueDateColor(
                        card.done
                      )} w-fit pl-3 pr-4 mt-1 py-1 flex justify-center items-center rounded-md`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(card.duedate).toLocaleDateString("en-US")}
                    </button>
                  ) : null}
                </div>
              </div>
            );
          }}
        </Draggable>
      );
    else {
      return (
        <div key={card.id}>
          <div
            onClick={() => {
              props.handle(props.list, card);
            }}
            className="cursor-pointer p-2 w-full text-left bg-white rounded-sm border"
          >
            {card.labels ? (
              <div className="flex flex-wrap">
                {card.labels.map((label) => {
                  return (
                    <div
                      key={card.id + label}
                      className={`h-2 w-10 ${label} rounded-md mt-1 ml-1`}
                    ></div>
                  );
                })}
              </div>
            ) : null}

            {card.title}

            {card.duedate ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (card.done && card.done === "yes") {
                    updateDoc(doc(db, "card", card.id), {
                      done: "",
                    });
                    return;
                  }

                  e.target.classList.remove("bg-gray-300");
                  e.target.classList.add("bg-green-300");

                  updateDoc(doc(db, "card", card.id), {
                    done: "yes",
                  });
                }}
                className={`text-gray-600 text-xs ${dueDateColor(
                  card.done
                )} w-fit pl-3 pr-4 mt-1 py-1 flex justify-center items-center rounded-md`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {new Date(card.duedate).toLocaleDateString("en-US")}
              </button>
            ) : null}
          </div>
        </div>
      );
    }
  };

  return <>{cards.map(createNewCard)}</>;
};

export default Card;
