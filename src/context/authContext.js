import { createContext, useContext } from "react";
import { auth } from "../firebase-config";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("no hay un provedor de autentificación");
  }
  return context;
};

export function AuthProvider({ children }) {
  const user = { login: true };
  return (
    <authContext.Provider value={{ user }}>{children}</authContext.Provider>
  );
}
