import React, { useState } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useAuth } from "../context/authContext";
import { Facebook, Google } from "@mui/icons-material";
import { useSnackbar } from "notistack";

export const SignInOut = () => {
  const { signGoogle, signFacebook, user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
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
                enqueueSnackbar(`Error en inicio ${error}`, {
                  variant: "error",
                  autoHideDuration: "1000",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
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
                enqueueSnackbar(`Error en inicio ${error}`, {
                  variant: "error",
                  autoHideDuration: "1000",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
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
