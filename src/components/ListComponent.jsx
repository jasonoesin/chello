import AddCard from "./AddCard";
import { Fragment, useEffect, useRef } from "react";
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
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams, useLocation, Link } from "react-router-dom";
import Card from "./Card";
import CardDetail from "./CardDetail";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ListComponent = (props) => {
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

  var createNewList = (list) => {
    return (
      <Droppable key={list.id} droppableId={list.id}>
        {(provided, snapshot) => {
          return (
            <Fragment>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="h-fit ml-2 mb-2 bg-gray-50  rounded-sm w-1/4 p-2 shadow-md "
              >
                {props.isMember ? (
                  <input
                    onKeyDown={(e) => {
                      handleChange(e, list);
                    }}
                    id="title"
                    defaultValue={list.title}
                    type=" text"
                    className="bg-gray-50 p-2 text-gray-600 font-bold"
                  ></input>
                ) : (
                  <div className="bg-gray-50 p-2 text-gray-600 font-bold">
                    {list.title}
                  </div>
                )}

                <Card
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
      {lists.map(createNewList)}
    </DragDropContext>
  );
};

export default ListComponent;
