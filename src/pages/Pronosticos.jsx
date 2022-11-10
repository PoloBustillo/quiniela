import React, { useContext } from "react";
import { Layout } from "./Layout";
import { useAuth } from "../context/authContext";

export const Pronosticos = () => {
  const authContext = useAuth();
  console.log(authContext);
  return (
    <Layout>
      <div>Pronosticos</div>
    </Layout>
  );
};
