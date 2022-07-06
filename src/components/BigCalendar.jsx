import { createRef, useState } from "react";
import { useRef } from "react";
import { UserAuth } from "../middleware/AuthContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useLocation, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

const BigCalendar = (props) => {
  const [lists, setLists] = useState([]);
  const [events, setCards] = useState([]);
  const [modal, setModal] = useState(false);
  const params = useParams();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "list"),
      (snap) => {
        if (!snap.empty) {
          (async () => {
            var arr = snap.docs.filter((l) => {
              return l.data().board === params.id;
            });

            Promise.all(
              arr.map((el) => {
                return { value: el.id, label: el.data().title };
              })
            ).then((newLists) => {
              setLists(newLists);
            });
          })();
        }
      },
      []
    );

    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "card"), (snap) => {
      if (!snap.empty) {
        // setCards(
        //   snap.docs
        //     .map((d) => {
        //       if (d.data().duedate !== undefined) {
        //         return {
        //           start: new Date(d.data().duedate),
        //           end: new Date(d.data().duedate),
        //           title: d.data().title,
        //         };
        //       }
        //     })
        //     .filter((val) => {
        //       return val !== undefined;
        //     })
        // );
        let ev = [];
        var prom = snap.docs.map(async (c) => {
          if (c.data().duedate !== undefined) {
            const l = await getDoc(doc(db, "list", c.data().list));
            if (l) {
              const b = await getDoc(doc(db, "board", l.data().board));
              if (b.data() !== undefined && b.data().id === params.id)
                ev.push({
                  start: new Date(c.data().duedate),
                  end: new Date(c.data().duedate),
                  title: c.data().title,
                });
            }
          }
        });
        Promise.all(prom).then(() => {
          setCards(ev);
        });
      }
    });

    return unsub;
  }, []);

  const [date, setDate] = useState();

  const onSelectSlot = (slot) => {
    setDate(slot.start.getTime());
    setModal(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (e.target.selectRef.value === "") {
      toast.warning("You must select list to create the card !", {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (e.target.title.value === "") {
      toast.warning("You must pick a card title !", {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    addDoc(collection(db, "card"), {
      list: e.target.selectRef.value,
      title: e.target.title.value,
      duedate: date,
    });

    toast.success("Card added !", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setModal(false);
  };

  const { nav } = UserAuth();

  return (
    <>
      <div className="mt-1 mb-3 relative font-bold text-gray-900 tracking-tight text-4xl flex items-center">
        {props.board.title}
        <button
          onClick={() => {
            nav("board/" + params.id);
          }}
          className=" w-fit flex justify-center 
                hover:bg-gray-500
                bg-gray-600 p-2 rounded absolute left-[13rem] text-white text-sm"
        >
          Normal View
        </button>
      </div>
      <div>
        <Calendar
          selectable={true}
          className="text-xs"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={onSelectSlot}
        />
      </div>

      {modal ? (
        <>
          {" "}
          <div className="backdrop-blur-sm z-[100] inset-0 bg-black bg-opacity-30 h-screen flex justify-center  overflow-y-scroll p-28 fixed">
            <div className="bg-white p-10 rounded w-2/3  h-fit relative space-y-3">
              <svg
                onClick={() => {
                  setModal(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute cursor-pointer right-4 top-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              {date ? (
                <p className="font-bold  text-2xl text-gray-600">
                  Create card with due date on{" "}
                  {new Date(date).toLocaleDateString("us-en")}
                </p>
              ) : null}
              <p>Select List</p>
              <form action="" onSubmit={onSubmit} className="space-y-4">
                <Select name="selectRef" options={lists} />
                <p>Pick a Card Title</p>
                <input
                  name="title"
                  className="w-1/3 text-sm font-normal p-2 bg-transparent border-2 border-gray-300 rounded-md"
                  type="text "
                  placeholder="Card Title "
                />
                <button
                  type="submit"
                  className="!mt-10 w-full flex justify-center 
            hover:bg-blue-600
            bg-blue-500 p-2 rounded text-white"
                >
                  Add Card
                </button>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default BigCalendar;
