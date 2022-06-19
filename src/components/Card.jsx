import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

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

  const createNewCard = (card) => {
    return (
      <button
        key={card.id}
        className="p-2 w-full text-left bg-white rounded-sm border"
      >
        {card.title}
      </button>
    );
  };

  return <>{cards.map(createNewCard)}</>;
};

export default Card;
