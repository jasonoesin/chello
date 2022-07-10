import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";
import { subscribe, unsubscribe } from "./Observer/WatcherSubject";

const AddWatcher = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const popRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (popRef.current.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={popRef}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="!WATCHER relative p-2 mt-2 flex bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <p className="ml-2">Add Watcher</p>
      </div>
      {isOpen ? (
        <div className="absolute">
          <div className="w-[20rem] h-[24rem] rounded shadow-2xl bg-white border top-1 relative border-gray-200 overflow-auto p-2">
            <div className="font-bold text-center">Watchers</div>
            <hr className="relative top-2" />
            <WatcherMapper card_id={props.card_id} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

const WatcherMapper = (props) => {
  const [watchers, setWatchers] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "card", props.card_id), (snap) => {
      var prom = snap.data().watcher.map(async (id) => {
        return getDoc(doc(db, "user", id));
      });

      Promise.all(prom).then((docs) => {
        setWatchers(docs ? docs : []);
      });
    });

    return unsub;
  }, []);

  return (
    <>
      <p className="py-6 px-3 font-semibold">Assigned as Watcher</p>
      {watchers.map((w) => {
        const data = w.data();

        return (
          <div
            key={data.id}
            className="p-2 w-full border-gray-300 rounded border mt-1 relative"
          >
            <div className="absolute right-2">
              <svg
                onClick={() => {
                  unsubscribe(data.id, props.card_id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 12H4"
                />
              </svg>
            </div>
            {data.name}
          </div>
        );
      })}
      <MemberMapper card_id={props.card_id} />
    </>
  );
};

const MemberMapper = (props) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "card", props.card_id), (snap) => {
      getDoc(doc(db, "list", snap.data().list)).then((l) => {
        onSnapshot(doc(db, "board", l.data().board), (s) => {
          const m = s
            .data()
            .members.map((id) => {
              if (snap.data().watcher === undefined) return id;

              return snap.data().watcher.includes(id) ? null : id;
            })
            .filter((val) => {
              return val !== null;
            });

          var prom = m.map(async (id) => {
            return getDoc(doc(db, "user", id));
          });

          Promise.all(prom).then((docs) => {
            setMembers(docs);
          });
        });
      });
    });
  }, []);

  return (
    <>
      <p className="py-6 px-3 font-semibold">Unassigned Members</p>

      <div className="flex flex-col">
        {members.map((m) => {
          const data = m.data();

          return (
            <div
              key={data.id}
              className="p-2 w-full border-gray-300 rounded border mt-1 relative"
            >
              <div className="absolute right-2">
                <svg
                  onClick={() => {
                    subscribe(data.id, props.card_id);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              {data.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddWatcher;
