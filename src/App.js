import "./App.css";
import { SignInOut } from "./components/SignInOut";
import { Col, Row } from "react-bootstrap";
import { Layout } from "./pages/Layout";
import { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";

import { Paper } from "@mui/material";

function App() {
  const navigation = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation("/mis-pronosticos");
    }
  }, [user]);

  return (
    <Layout>
      <Row
        style={{
          marginTop: "10vh",
          width: "100vw",
          textAlign: "center",
        }}
      >
        <img height={"150px"} src="/flags/copalogo.svg"></img>
        <Col>
          <SignInOut></SignInOut>
        </Col>
      </Row>
      <Row
        style={{
          width: "100vw",
          textAlign: "center",
          bottom: 20,
          position: "absolute",
        }}
      >
        <Paper
          elevation={24}
          style={{
            width: "100vw",
            backgroundColor: "rgba(10,10,10,.3)",
            color: "white",
          }}
        >
          <h5>Reglas</h5>
          <p>
            <b>FASE DE GRUPOS:</b> ($150) Deposito a{" "}
            <b>BANAMEX: 5204 1674 0947 6496</b>
          </p>
          <p>
            <b>PREMIOS:</b> 1er y 2ndo lugar (por cada jugador $100 van al
            primer lugar $50 al segundo) si hay mas de un 1er lugar, el segundo
            lugar se elimina
          </p>
          <p>
            <b>PUNTUACIÓN:</b> La puntuación sera de 1 punto acertando el
            resultados, 2 puntos acertando resultado y marcador
          </p>
        </Paper>
      </Row>
    </Layout>
  );
}

export default App;
