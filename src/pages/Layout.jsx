import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const Layout = ({ children }) => {
  const navigation = useNavigate();
  const { user } = useAuth();
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
              {!user ? "Mis Pronósticos" : `Pronósticos(${user?.displayName})`}
            </Nav.Link>
          </Nav>
          {user && (
            <>
              <Nav.Link
                className="d-flex"
                onClick={() => {
                  navigation("/resultados");
                }}
              >
                <img
                  src={`${user?.photoURL}`}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="avatar"
                ></img>
              </Nav.Link>
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
            </>
          )}
        </Container>
      </Navbar>
      {children}
    </Container>
  );
};
