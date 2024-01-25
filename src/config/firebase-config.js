import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; //db

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARslH4jPP9cTtXZcLtUH0qEWZVC5cNuPI",
  authDomain: "expense-tracker-70b1a.firebaseapp.com",
  projectId: "expense-tracker-70b1a",
  storageBucket: "expense-tracker-70b1a.appspot.com",
  messagingSenderId: "217369420707",
  appId: "1:217369420707:web:eafbba332e4a0838987016",
  measurementId: "G-YGFQ4RVZX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); //define database from getstore
