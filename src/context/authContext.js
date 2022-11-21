import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { fetchPronosticos } from "../redux/slices/pronosticosReducer";
import { fetchAllPartidos } from "../redux/slices/partidosReducer";
import { useSnackbar } from "notistack";
import * as Sentry from "@sentry/react";

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
        Sentry.setUser(user);
        Sentry.captureMessage(`${user.displayName} logged`);
        try {
          dispatch(fetchPronosticos(user));
          dispatch(fetchAllPartidos());
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
