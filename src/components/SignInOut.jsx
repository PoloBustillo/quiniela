import React, { useState } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Facebook, Google } from "@mui/icons-material";

export const SignInOut = () => {
  const { signGoogle, signFacebook } = useAuth();
  const [error, setError] = useState("");
  const navigation = useNavigate();
  return (
    <Form>
      <Row className="my-5 text-center">
        <Col></Col>
        <Col>
          <Button
            variant="outlined"
            color="secondary"
            style={{
              color: "white",
              borderColor: "white",
            }}
            onClick={async () => {
              try {
                signFacebook();
              } catch (error) {
                setError(error);
              }
            }}
            startIcon={<Facebook />}
          >
            Facebook
          </Button>
        </Col>

        <Col>
          <Button
            variant="outlined"
            color="secondary"
            style={{
              color: "white",
              borderColor: "white",
            }}
            onClick={async () => {
              try {
                signGoogle();
              } catch (error) {
                setError(error);
              }
            }}
            startIcon={<Google />}
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
