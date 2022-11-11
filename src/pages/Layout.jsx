import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const navigation = useNavigate();
  return (
    <Container fluid>
      <Navbar className="nav-bar-section">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigation("/");
            }}
          >
            Quiniela
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigation("/mis-pronosticos");
              }}
            >
              Mis Pronósticos
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigation("/resultados");
              }}
            >
              Resultados
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="d-flex"
              onClick={() => {
                signOut(auth);
                navigation("/");
              }}
            >
              Salir
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {children}
    </Container>
  );
};
