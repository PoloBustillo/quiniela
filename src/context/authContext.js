import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  fetchPronosticos,
  initPronosticos,
} from "../redux/slices/pronosticosReducer";
import { fetchAllPartidos } from "../redux/slices/partidosReducer";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    let authObserver = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        console.log("onAuthStateChanged: User is logged", user);
        try {
          dispatch(fetchAllPartidos());
          dispatch(fetchPronosticos(user));
        } catch (error) {
          enqueueSnackbar(`Error en autentificación ${error}`, {
            variant: "error",
            autoHideDuration: "1000",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
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
