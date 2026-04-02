import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCoiiV5MGqzFaDOEtfUJUEAn9zmMvpcMIs",
  authDomain: "cypherconnect-new-prod.firebaseapp.com",
  projectId: "cypherconnect-new-prod",
  storageBucket: "cypherconnect-new-prod.firebasestorage.app",
  messagingSenderId: "825178496416",
  appId: "1:825178496416:web:5380ba80f5e3a3bbaf58c5",
  measurementId: "G-GZ0N33G2S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export default app;
