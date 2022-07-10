import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export async function notify(watcher_id, card_id) {
  return getDoc(doc(db, "card", card_id)).then((d) => {
    console.log("Ini Mau Notify");
    updateDoc(doc(db, "notification", watcher_id), {
      reminder: arrayUnion(
        "Card " + d.data().title + " is past due date. (Role Watcher)"
      ),
    });
  });
}

export async function notifyReminder(watcher_id, card_id) {
  return getDoc(doc(db, "card", card_id)).then((d) => {
    console.log("Ini Mau Notify Reminder");
    updateDoc(doc(db, "notification", watcher_id), {
      reminder: arrayUnion(
        "Card " + d.data().title + " is almost due date. (Role Watcher)"
      ),
    });
  });
}
