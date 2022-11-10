// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyb2ix_KNr4VzM3SA-ANHZR3Cxwsg4VT0",
  authDomain: "quiniela-f4514.firebaseapp.com",
  projectId: "quiniela-f4514",
  storageBucket: "quiniela-f4514.appspot.com",
  messagingSenderId: "860960771708",
  appId: "1:860960771708:web:4d70d0eda2328163f203f9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
