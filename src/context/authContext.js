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
import { fetchAllPartidos } from "../redux/slices/partidosReducer";

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

  const dispatch = useDispatch();
  useEffect(() => {
    let authObserver = onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged: User is logged", user);
      setUser(user);

      if (user) {
        try {
          const pronosticosRef = doc(db, "pronosticos", user.uid);
          const docSnap = await getDoc(pronosticosRef);
          dispatch(fetchAllPartidos());
          let mis_pronosticos = docSnap.data();
          if (mis_pronosticos?.data) {
            dispatch(initPronosticos(mis_pronosticos));
          } else {
            setDoc(pronosticosRef, { active: false, name: user.displayName });
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
    <authContext.Provider value={{ signGoogle, signFacebook, user }}>
      {children}
    </authContext.Provider>
  );
}
