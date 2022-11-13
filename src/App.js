import "./App.css";
import { SignInOut } from "./components/SignInOut";
import { Card, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { Layout } from "./pages/Layout";
import { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";
import { getTokenFirebase, onMessageListener } from "./firebase-config";

let date = new Date().toLocaleDateString();

function App() {
  const [isTokenFound, setTokenFound] = useState(false);

  const [show, setShow] = useState(false);
  const navigation = useNavigate();
  const { user } = useAuth();

  onMessageListener()
    .then((payload) => {
      setShow(true);
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
          width: "80vw",
          margin: "auto",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <img
          onClick={() => {
            setShow(true);
          }}
          style={{ cursor: "pointer" }}
          height={"150px"}
          src="/flags/copalogo.svg"
        ></img>
        <ToastContainer className="p-3" position={"top-center"}>
          <Toast onClose={() => setShow(false)} show={show}>
            <Toast.Header closeButton={true}>
              <strong className="me-auto">Instrucciones</strong>
              <small>{date}</small>
            </Toast.Header>
            <Toast.Body>
              <Card as={Col}>
                <Card.Body>
                  <Card.Title>Reglas</Card.Title>
                  <Card.Text>
                    FASE DE GRUPOS ($150) Deposito a 5204 1674 0947 6496
                  </Card.Text>
                  <Card.Text>
                    PREMIOS: 1er y 2ndo lugar (por cada jugador $100 van al
                    primer lugar $50 al segundo) si hay mas de un 1er lugar, el
                    segundo lugar se elimina
                  </Card.Text>
                  <Card.Text>
                    PUNTUACIÓN: La puntuación sera de 1 punto acertando el
                    resultados, 2 puntos acertando resultado y marcador
                  </Card.Text>
                </Card.Body>
              </Card>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>

      <Row
        style={{
          margin: "auto",
          width: "80vw",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <Col>
          <SignInOut></SignInOut>
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
