import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { initPronosticos } from "../redux/slices/pronosticosReducer";

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
  const dispatch = useDispatch();
  useEffect(() => {
    let authObserver = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      isLoading(false);
      if (user) {
        console.log("INIT pronosticos:{Redux}");
        try {
          const pronosticosRef = doc(db, "pronosticos", user.uid);
          const docSnap = await getDoc(pronosticosRef);
          let mis_pronosticos = docSnap.data();
          if (mis_pronosticos) {
            dispatch(initPronosticos(mis_pronosticos));
          } else {
            setDoc(pronosticosRef, {});
            dispatch(initPronosticos([]));
          }
        } catch (error) {
          throw new Error(error);
        }
      }
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
