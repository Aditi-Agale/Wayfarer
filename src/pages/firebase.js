import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0jwQnX0xac9cd-3phfCf_aaHpOwbALFE",
    authDomain: "wayfarer-9280d.firebaseapp.com",
    projectId: "wayfarer-9280d",
    storageBucket: "wayfarer-9280d.appspot.com", // ✅ Corrected value
    messagingSenderId: "820212913513",
    appId: "1:820212913513:web:4a9915b842653e2b1259f8",
    measurementId: "G-K469EDB5TB"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Get Auth & Firestore Instances
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export them for use in other files
export { auth, app, db };
