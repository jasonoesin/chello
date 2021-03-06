import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../middleware/AuthContext";
import {
  notifyReminderWatcher,
  notifyWatcher,
} from "../components/Observer/WatcherSubject";

const newContext = createContext();

export const ReminderContext = ({ children }) => {
  const [reminders, setReminders] = useState({});
  const { user } = UserAuth();

  const colRef = collection(db, "reminder");
  const cardRef = collection(db, "card");

  useEffect(() => {
    if (user)
      if (user.uid !== undefined) {
        const fetch = async () => {
          while (true)
            await new Promise((resolve) => {
              // console.log("awal async timeout");
              //   QUERY REMINDER TIAP SATU MENIT

              getDocs(cardRef)
                .then((snap) => {
                  snap.docs.forEach((d) => {
                    if (
                      new Date() > new Date(d.data().duedate) &&
                      !d.data().notify
                    ) {
                      notifyWatcher(d.id);
                    }
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    resolve();
                  }, 60000);
                });

              getDocs(colRef)
                .then((snap) => {
                  snap.docs.forEach((d) => {
                    if (new Date() > new Date(d.data().reminder)) {
                      // REMIND

                      getDoc(doc(db, "card", d.id)).then((c) => {
                        if (new Date() > new Date(c.data().duedate)) {
                          updateDoc(doc(db, "card", d.id), {
                            done: "due",
                          });
                        }

                        notifyReminderWatcher(d.id);
                        deleteDoc(doc(db, "reminder", d.id));

                        // getDoc(doc(db, "board", d.data().board)).then((s) => {
                        //   s.data().members.map((id) => [
                        //     updateDoc(doc(db, "notification", id), {
                        //       reminder: arrayUnion(
                        //         "Card " +
                        //           c.data().title +
                        //           " is almost due date."
                        //       ),
                        //     }),
                        //   ]);
                        //   deleteDoc(doc(db, "reminder", d.id));
                        // });
                      });
                    }
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    resolve();
                  }, 60000);
                });
            });
        };

        fetch();
      }
  }, [user]);

  return (
    <newContext.Provider value={{ reminders }}>{children}</newContext.Provider>
  );
};

export const GetReminders = () => {
  return useContext(newContext);
};
