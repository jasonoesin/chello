import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../middleware/AuthContext";

const Context = createContext();

export const NotifContext = ({ children }) => {
  const [notifs, setNotifs] = useState({});
  const { user } = UserAuth();

  useEffect(() => {
    var unsub;

    if (user)
      if (user.uid !== undefined) {
        const ref = doc(db, "notification", user.uid);
        unsub = onSnapshot(ref, (snap) => {
          if (snap) setNotifs(snap.data());
        });
      }

    return unsub;
  }, [user]);

  return <Context.Provider value={{ notifs }}>{children}</Context.Provider>;
};

export const GetNotif = () => {
  return useContext(Context);
};
