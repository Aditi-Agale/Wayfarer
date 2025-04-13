// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0jwQnX0xac9cd-3phfCf_aaHpOwbALFE",
  authDomain: "wayfarer-9280d.firebaseapp.com",
  projectId: "wayfarer-9280d",
  storageBucket: "wayfarer-9280d.appspot.com",
  messagingSenderId: "820212913513",
  appId: "1:820212913513:web:4a9915b842653e2b1259f8",
  measurementId: "G-K469EDB5TB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); //

export { db,auth};
