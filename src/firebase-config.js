// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3cyOUgBdYyMZ61U0MEAncDdslWQ86CBw",
  authDomain: "tpa-desktop-7d54d.firebaseapp.com",
  projectId: "tpa-desktop-7d54d",
  storageBucket: "tpa-desktop-7d54d.appspot.com",
  messagingSenderId: "987011377576",
  appId: "1:987011377576:web:092db8a133eb79246d159d"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export default {app};