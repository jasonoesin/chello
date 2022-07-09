import { doc, onSnapshot } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { db } from "../firebase-config";
import Checklist from "./Checklist";

const CheckListRender = (props) => {
  const [checklists, setChecklists] = useState([]);

  const colRef = doc(db, "card", props.card);

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      //   setData(snapshot.data());
      setChecklists(snapshot.data().checklist ? snapshot.data().checklist : []);
    });

    return unsub;
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {checklists.map(({ items, name }, index) => {
          return (
            <Checklist
              items={items}
              key={name + index}
              card={props.card}
              name={name}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default CheckListRender;
