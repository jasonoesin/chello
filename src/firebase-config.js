// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  initializeFirestore,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBhN18lCjWcLG0VueicGCdbc8V1f7mTK-E",
//   authDomain: "chello-bc57b.firebaseapp.com",
//   projectId: "chello-bc57b",
//   storageBucket: "chello-bc57b.appspot.com",
//   messagingSenderId: "132208359798",
//   appId: "1:132208359798:web:af145846f832f6ad8d2257",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDg0ZxTtGoqu946gkq--74WhaDGNCpBvsM",
  authDomain: "chello-new.firebaseapp.com",
  projectId: "chello-new",
  storageBucket: "chello-new.appspot.com",
  messagingSenderId: "145875054574",
  appId: "1:145875054574:web:6cb473dee61d2f20de28ff",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Initialize Firestore
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default app;
