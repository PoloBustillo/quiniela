import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const addTodo = async () => {
  try {
    const docRef = await getDocs(collection(db, "testing"));
    console.log("Document written with ID: ", docRef.docs);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("no hay un provedor de autentificación");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    let authObserver = onAuthStateChanged(auth, (user) => {
      setUser(user);
      isLoading(false);
    });

    return () => {
      authObserver();
    };
  }, []);

  const signGoogle = () => signInWithPopup(auth, providerGoogle);
  const signFacebook = () => signInWithPopup(auth, providerFacebook);
  return (
    <authContext.Provider value={{ signGoogle, signFacebook, user, loading }}>
      {children}
    </authContext.Provider>
  );
}
