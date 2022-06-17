import AddCard from "./AddCard";
import { useEffect } from "react";
import { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams, useLocation, Link } from "react-router-dom";

const ListComponent = () => {
  const [lists, setList] = useState([]);
  const colRef = collection(db, "list");
  const params = useParams();
  const location = useLocation();

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

  var createNewList = (list) => {
    return (
      <div className="!LIST ml-2 bg-gray-50 rounded-sm w-1/4 p-2 drop-shadow-lg ">
        <input
          type=" text"
          className="bg-gray-50 p-2 text-gray-600 font-bold"
          value={list.title}
        ></input>
        <AddCard />
      </div>
    );
  };

  return <>{lists.map(createNewList)}</>;
};

export default ListComponent;
