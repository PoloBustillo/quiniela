import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

export const Partido = () => {
  return (
    <Row className="my-3 bg-black">
      <Col style={{ color: "whitesmoke" }}>
        <Card className="text-center">
          <Card.Header style={{ color: "black" }}>Local</Card.Header>
          <Card.Body style={{ backgroundColor: "rgb(30,30,30)" }}>
            <Card.Title>ARGENTINA</Card.Title>
            <Card.Text>
              <img src="/flags/ARG.svg"></img>
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </Col>
      <Col sm={2}>VS</Col>
      <Col style={{ color: "whitesmoke" }}>
        <Card className="text-center">
          <Card.Header style={{ color: "black" }}>Visitante</Card.Header>
          <Card.Body style={{ backgroundColor: "rgb(30,30,30)" }}>
            <Card.Title>ALEMANIA</Card.Title>
            <Card.Text>
              <img src="/flags/GER.svg"></img>
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
