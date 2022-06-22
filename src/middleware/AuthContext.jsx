import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    var getData;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      getData = onSnapshot(doc(db, "user", currentUser.uid), (s) => {
        setUserData(s.data());
      });
    });
    return () => {
      unsubscribe();
      getData();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, nav }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
