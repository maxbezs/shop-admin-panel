import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXMQPlGkL8wHxyc1EgpNLvSBRQt9qeoaU",
  authDomain: "e-commerce-82915.firebaseapp.com",
  projectId: "e-commerce-82915",
  storageBucket: "e-commerce-82915.appspot.com",
  messagingSenderId: "405556393687",
  appId: "1:405556393687:web:983287b20543317fa32292",
  measurementId: "G-GPV5K8PGRF",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
