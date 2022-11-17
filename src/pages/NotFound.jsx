import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export const NotFound = () => {
  let error = useRouteError();
  return (
    <Container fluid>
      <Row className="align-items-center" style={{ height: "100vh" }}>
        <Col
          className="align-items-center justify-content-center"
          sm={{ span: 8, offset: 2 }}
        >
          <Alert style={{ height: "30vh" }} variant="danger">
            <div style={{ textAlign: "center", marginTop: "10vh" }}>
              Ruta no encontrada:
              {JSON.stringify(error)}
            </div>
            <div style={{ textAlign: "center" }}>
              <a href="/">Regresar</a>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};
