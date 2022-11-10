import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Quiniela</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/mis-pronosticos">Mis Pronosticos</Nav.Link>
            <Nav.Link href="/resultados">Resultados</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="d-flex" href="/">
              Salir
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {children}
    </Container>
  );
};
