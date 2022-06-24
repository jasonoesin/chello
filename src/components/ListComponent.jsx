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

  var createNewList = (list) => {
    return (
      <Fragment key={list.id}>
        <div className="h-fit ml-2 mb-2 bg-gray-50  rounded-sm w-1/4 p-2 shadow-md ">
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

          <Card list={list.id} handle={handleClickCard} />
          {props.isMember ? <AddCard list={list.id} /> : null}
        </div>

        {list.id === detail ? (
          <CardDetail
            current={curr.current}
            hidden="false"
            handle={handleClickCard}
            isMember={props.isMember}
          />
        ) : null}
      </Fragment>
    );
  };

  return <>{lists.map(createNewList)}</>;
};

export default ListComponent;
