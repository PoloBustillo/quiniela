import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVa7qtEUjOjYq3AvqJme6GO40AhHW6eA0",
  authDomain: "quiniela-mundial-84bbb.firebaseapp.com",
  projectId: "quiniela-mundial-84bbb",
  storageBucket: "quiniela-mundial-84bbb.appspot.com",
  messagingSenderId: "616199063502",
  appId: "1:616199063502:web:6e1e561161bcafe9120d9f",
  measurementId: "G-5V8CZXWQTD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
