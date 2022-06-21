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
import CardDetail from "./CardDetail";
import { Fragment } from "react";

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
      <Fragment key={card.id}>
        <button
          onClick={() => {
            props.handle(props.list, card);
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
        </button>
      </Fragment>
    );
  };

  return <>{cards.map(createNewCard)}</>;
};

export default Card;
