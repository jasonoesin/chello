import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import LabelColor from "./LabelColor";

const auth = getAuth();

const LabelRender = (props) => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, "user"), where("id", "==", user.uid));
        onSnapshot(q, (snap) => {
          snap.docs.map((doc) => {
            // console.log(doc.data().labels);
            setLabels(doc.data().labels);
          });
        });
      }
    });
  }, []);

  return (
    <>
      {/* {labels.map(({ color, name }) => {
        // console.log(color, name);
        return (
          <LabelColor
            curr_id={props.current.id}
            curr={curr.labels}
            color={color}
          />
        );
      })} */}
    </>
  );
};

export default LabelRender;
