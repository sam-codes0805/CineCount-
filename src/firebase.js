import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpVwWwYywIqzs2-r-0I9Nvrd2u3c9M43A",
  authDomain: "movie-booking-db6a0.firebaseapp.com",
  projectId: "movie-booking-db6a0",
  storageBucket: "movie-booking-db6a0.firebasestorage.app",
  messagingSenderId: "45849172357",
  appId: "1:45849172357:web:b3ec7a1c5e26f4ff120cec",
  measurementId: "G-1C167PK449"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);