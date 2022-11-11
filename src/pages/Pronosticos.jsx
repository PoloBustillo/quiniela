import React, { useContext } from "react";
import { Layout } from "./Layout";
import { useAuth } from "../context/authContext";

export const Pronosticos = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Layout>
      <div>Pronosticos</div>
    </Layout>
  );
};
