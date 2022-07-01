import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { UserAuth } from "../middleware/AuthContext";

const Favorite = () => {
  const [fav, setFav] = useState([]);

  const { user, nav } = UserAuth();

  useEffect(() => {
    var sub, sub2;
    if (user.uid) {
      sub = onSnapshot(doc(db, "user", user.uid), (dat) => {
        if (dat.data().favorite) {
          var prom = dat.data().favorite.map(async (data) => {
            const q = doc(db, "board", data);
            const qSnap = await getDoc(q);
            return { ...qSnap.data(), id: qSnap.id };
          });
        } else setFav([]);

        Promise.all(prom).then((docs) => {
          setFav(docs);
        });
      });
    }

    return () => {
      if (sub) sub();
      if (sub2) sub2();
    };
  }, [user]);

  if (fav.length === 0) return null;

  return (
    <div className="min-h-[18rem] relative mb-14">
      <div className="mt-1  font-bold text-gray-900 tracking-tight text-4xl">
        Favorited Boards
      </div>

      <div className=" mt-5 mx-auto text-xl text-gray-500">
        View all your favorited boards on CHello platforms
      </div>

      <div className="flex flex-col container max-w-sm mt-10 w-full items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <ul className="w-full">
          {fav.map((b) => {
            return (
              <li
                className="flex flex-row w-full relative items-center"
                key={b.title}
              >
                <svg
                  onClick={async () => {
                    const curr = await getDoc(doc(db, "user", user.uid));
                    if (
                      curr.data().favorite &&
                      !curr.data().favorite.includes(b.id)
                    )
                      updateDoc(doc(db, "user", user.uid), {
                        favorite: arrayUnion(b.id),
                      });
                    else {
                      updateDoc(doc(db, "user", user.uid), {
                        favorite: arrayRemove(b.id),
                      });
                    }
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 absolute -right-12 fle cursor-pointer fill-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <Link
                  to={"/board/" + b.id}
                  className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4"
                >
                  <div className="flex-1 pl-1">
                    <div className="font-medium dark:text-white">{b.title}</div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-gray-600 dark:text-gray-200 text-xs">
                      {b.members.length} Total Member
                    </div>
                    <button className="w-10 text-right flex justify-end">
                      <svg
                        width="20"
                        fill="currentColor"
                        height="20"
                        className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Favorite;
