import logo from "./logo.svg";
import "./App.css";
import { SignInOut } from "./components/SignInOut";
import { Card, Col, Row } from "react-bootstrap";
import { auth } from "./firebase-config";
import { Layout } from "./pages/Layout";

function App() {
  console.log(auth);
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
        <Card as={Col}>
          <Card.Body>
            <Card.Title>Reglas</Card.Title>
            <Card.Subtitle>
              FASE DE GRUPOS ($150) Deposito a 5204 1674 0947 6496
            </Card.Subtitle>
            <Card.Text>
              PREMIOS: 1er y 2ndo lugar (por cada jugador $100 van al primer
              lugar $50 al segundo) si hay mas de un 1er lugar, el segundo lugar
              se elimina
            </Card.Text>
            <Card.Text>
              La puntuación sera de 1 punto acertando el resultados, 2 puntos
              acertando resultado y marcador
            </Card.Text>
          </Card.Body>
        </Card>
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
