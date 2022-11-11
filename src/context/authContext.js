import { createContext, useContext } from "react";
import { auth } from "../firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
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
  const user = auth.currentUser;
  console.log(user);

  const signGoogle = () => signInWithPopup(auth, providerGoogle);
  const signFacebook = () => signInWithPopup(auth, providerFacebook);
  return (
    <authContext.Provider value={{ signGoogle, signFacebook, user }}>
      {children}
    </authContext.Provider>
  );
}
