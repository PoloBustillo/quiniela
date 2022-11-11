import React, { useState } from "react";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const SignInOut = () => {
  const { signGoogle, signFacebook } = useAuth();
  const [error, setError] = useState("");
  const navigation = useNavigate();
  return (
    <Form>
      <Row className="m-5">
        <Col>
          <h4 style={{ color: "white" }}>Entrar con algún método</h4>
        </Col>
      </Row>

      <Row className="mb-3 text-center">
        <Col></Col>
        <Col>
          <Button
            onClick={async () => {
              try {
                signFacebook();
              } catch (error) {
                setError(error);
              }
            }}
            variant="outline-light"
          >
            Facebook
          </Button>
        </Col>

        <Col>
          <Button
            variant="outline-light"
            onClick={async () => {
              try {
                signGoogle();
              } catch (error) {
                setError(error);
              }
            }}
          >
            Google
          </Button>
        </Col>
        <Col></Col>
        {error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}
      </Row>
    </Form>
  );
};
