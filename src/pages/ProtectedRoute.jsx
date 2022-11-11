import React from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log(user);
  console.log(loading);

  if (loading)
    return (
      <div className="center">
        <Spinner animation="border" variant="light" />
      </div>
    );
  if (!user) return <Navigate to="/"></Navigate>;
  return <>{children}</>;
};
