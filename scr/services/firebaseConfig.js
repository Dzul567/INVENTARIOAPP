import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd8J2IeGsSFqyB6PJb1ziU7JwO9Waxyv4",
  authDomain: "inventarioapp-38431.firebaseapp.com",
  projectId: "inventarioapp-38431",
  storageBucket: "inventarioapp-38431.firebasestorage.app",
  messagingSenderId: "387814684635",
  appId: "1:387814684635:web:0461cf991d4a1b2f0dd9fe"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);