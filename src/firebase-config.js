// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3cyOUgBdYyMZ61U0MEAncDdslWQ86CBw",
  authDomain: "tpa-desktop-7d54d.firebaseapp.com",
  projectId: "tpa-desktop-7d54d",
  storageBucket: "tpa-desktop-7d54d.appspot.com",
  messagingSenderId: "987011377576",
  appId: "1:987011377576:web:092db8a133eb79246d159d",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();

// Collection Reference
// const colRef = collection(db, "workspace");

// // Get Data
// getDocs(colRef)
//   .then((snapshot) => {
//     let workspace = [];
//     snapshot.docs.forEach((doc) => {
//       workspace.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(workspace);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

export default app;
