import AddCard from "./AddCard";
import { Fragment, useEffect, useImperativeHandle, useRef } from "react";
import { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams, useLocation, Link } from "react-router-dom";
import Card from "./Card";
import CardDetail from "./CardDetail";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { forwardRef } from "react";

const ListComponent = forwardRef((props, ref) => {
  const [lists, setList] = useState([]);
  const [detail, setDetail] = useState("");

  const colRef = collection(db, "list");
  const params = useParams();
  const location = useLocation();

  const curr = useRef("");

  useEffect(() => {
    const q = query(colRef, where("board", "==", params.id));

    const snaps = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        let b = [];
        snapshot.docs.forEach((doc) => {
          b.push({ ...doc.data(), id: doc.id });
        });
        setList(b);
        setFiltered(b);
      } else {
        setList([]);
        setFiltered([]);
      }
    });

    return snaps;
  }, [location]);

  const handleClickCard = (id, card) => {
    setDetail(id);
    curr.current = card;
  };

  const handleChange = (e, list) => {
    if (e.key === "Enter") {
      updateDoc(doc(db, "list", list.id), {
        title: e.target.value,
      });
    }
  };

  const onDragEnd = (result, lists, setList) => {
    if (!result.destination) return;
    const { draggableId, source, destination } = result;

    updateDoc(doc(db, "card", draggableId), {
      list: destination.droppableId,
    });
  };

  // SEARCH
  const [filter, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useImperativeHandle(ref, () => ({
    searchOnChange(e, curr) {
      if (curr === "card") setSearch(e.target.value.toLowerCase());
      else if (curr === "list")
        setFiltered(
          lists.filter((list) => {
            return list.title
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          })
        );
    },
  }));

  var createNewList = (list) => {
    return (
      <Droppable key={list.id} droppableId={list.id}>
        {(provided, snapshot) => {
          return (
            <Fragment>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="h-fit ml-2 mb-2 bg-gray-50  rounded-sm w-1/4 p-2 shadow-md relative"
              >
                {props.isMember ? (
                  <>
                    <input
                      onKeyDown={(e) => {
                        handleChange(e, list);
                      }}
                      id="title"
                      defaultValue={list.title}
                      type=" text"
                      className="bg-gray-50 p-2 text-gray-600 font-bold"
                    ></input>
                    <svg
                      onClick={() => {
                        const colRef = collection(db, "card");
                        const q = query(colRef, where("list", "==", list.id));

                        getDocs(q).then((docs) => {
                          docs.docs.map((d) => {
                            deleteDoc(doc(db, "card", d.id));
                            deleteDoc(doc(db, "cardlink", d.id));
                            deleteDoc(doc(db, "reminder", d.id));
                          });
                        });

                        deleteDoc(doc(db, "list", list.id));
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 stroke-gray-600 absolute inline top-4 ml-4 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </>
                ) : (
                  <div className="bg-gray-50 p-2 text-gray-600 font-bold">
                    {list.title}
                  </div>
                )}

                <Card
                  search={search}
                  list={list.id}
                  handle={handleClickCard}
                  isMember={props.isMember}
                />
                {provided.placeholder}
                {props.isMember ? <AddCard list={list.id} /> : null}
              </div>

              {list.id === detail ? (
                <CardDetail
                  board={props.board}
                  current={curr.current}
                  hidden="false"
                  handle={handleClickCard}
                  isMember={props.isMember}
                />
              ) : null}
            </Fragment>
          );
        }}
      </Droppable>
    );
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      {filter.map(createNewList)}
    </DragDropContext>
  );
});

export default ListComponent;
