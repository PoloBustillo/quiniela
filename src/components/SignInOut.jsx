import React, { useState } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useAuth } from "../context/authContext";
import { Facebook, Google } from "@mui/icons-material";

export const SignInOut = () => {
  const { signGoogle, signFacebook, user } = useAuth();
  const [error, setError] = useState("");
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
                console.log(user);
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
