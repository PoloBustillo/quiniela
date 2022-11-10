import React from "react";
import { Button, FloatingLabel, Row, Col, Form, Card } from "react-bootstrap";

export const SignInOut = () => {
  return (
    <Form>
      <Card>
        <Card.Header>
          <Row className="m-3">
            <Col>
              <h4>Entrar con algún metodo</h4>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3 text-center">
            <Col></Col>
            <Col>
              <Button variant="outline-success" type="submit">
                Facebook
              </Button>
            </Col>

            <Col>
              <Button variant="outline-success" type="submit">
                Google
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};
