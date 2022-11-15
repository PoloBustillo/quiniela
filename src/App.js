import "./App.css";
import { SignInOut } from "./components/SignInOut";
import { Card, Col, Row } from "react-bootstrap";
import { Layout } from "./pages/Layout";
import { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";
import { getTokenFirebase, onMessageListener } from "./firebase-config";

let date = new Date().toLocaleDateString();

function App() {
  const [isTokenFound, setTokenFound] = useState(false);

  const navigation = useNavigate();
  const { user } = useAuth();

  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  useEffect(() => {
    getTokenFirebase(setTokenFound);
  }, []);
  useEffect(() => {
    if (user) {
      navigation("/mis-pronosticos");
    }
  }, [user]);

  return (
    <Layout>
      <Row
        style={{
          margin: "auto",
          width: "80vw",
          textAlign: "center",
        }}
      >
        <img
          style={{ cursor: "pointer" }}
          height={"150px"}
          src="/flags/copalogo.svg"
        ></img>
        <Col>
          <SignInOut></SignInOut>
        </Col>
      </Row>
      <Row
        style={{
          width: "80vw",
          margin: "auto",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Card as={Col}>
          <Card.Body>
            <Card.Title>Reglas</Card.Title>
            <Card.Text>
              <b>FASE DE GRUPOS:</b> ($150) Deposito a{" "}
              <b>5204 1674 0947 6496</b>
            </Card.Text>
            <Card.Text>
              <b>PREMIOS:</b> 1er y 2ndo lugar (por cada jugador $100 van al
              primer lugar $50 al segundo) si hay mas de un 1er lugar, el
              segundo lugar se elimina
            </Card.Text>
            <Card.Text>
              <b>PUNTUACIÓN:</b> La puntuación sera de 1 punto acertando el
              resultados, 2 puntos acertando resultado y marcador
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Layout>
  );
}

export default App;
