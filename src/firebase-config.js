// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhN18lCjWcLG0VueicGCdbc8V1f7mTK-E",
  authDomain: "chello-bc57b.firebaseapp.com",
  projectId: "chello-bc57b",
  storageBucket: "chello-bc57b.appspot.com",
  messagingSenderId: "132208359798",
  appId: "1:132208359798:web:af145846f832f6ad8d2257",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();

export default app;
