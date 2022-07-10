import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { notify, notifyNewComment, notifyReminder } from "./Watcher";
import { toast } from "react-toastify";

const msg = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Watcher Subscribes
export function subscribe(user_id, card_id) {
  updateDoc(doc(db, "card", card_id), {
    watcher: arrayUnion(user_id),
  });

  msg("Watcher Added !");
}

// Watcher Unsubscribes
export function unsubscribe(user_id, card_id) {
  updateDoc(doc(db, "card", card_id), {
    watcher: arrayRemove(user_id),
  });

  msg("Watcher Removed !");
}

export async function notifyWatcher(card_id) {
  const d = await getDoc(doc(db, "card", card_id));
  const watcher = d.data().watcher;

  if (watcher === undefined || watcher.length === 0) return;

  var prom = watcher.map(async (watcher_id) => {
    return notify(watcher_id, card_id);
  });

  Promise.all(prom).then(() => {
    updateDoc(doc(db, "card", d.id), {
      notify: true,
    });
  });
}

export async function notifyReminderWatcher(card_id) {
  const d = await getDoc(doc(db, "card", card_id));
  const watcher = d.data().watcher;

  if (watcher === undefined || watcher.length === 0) return;

  watcher.map(async (watcher_id) => {
    return notifyReminder(watcher_id, card_id);
  });
}

export async function notifyComment(card_id) {
  const d = await getDoc(doc(db, "card", card_id));
  const watcher = d.data().watcher;

  if (watcher === undefined || watcher.length === 0) return;

  watcher.map(async (watcher_id) => {
    return notifyNewComment(watcher_id, card_id);
  });
}
