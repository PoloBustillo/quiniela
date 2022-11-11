import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log(user);
  console.log(loading);

  if (loading) return <div style={{ color: "white" }}>LOADING</div>;
  if (!user) return <Navigate to="/"></Navigate>;
  return <>{children}</>;
};
