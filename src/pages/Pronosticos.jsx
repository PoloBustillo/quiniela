import React, { useEffect } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Partido } from "../components/Partido";
import { Layout } from "./Layout";
import CryptoJS from "crypto-js";

export const Pronosticos = () => {
  useEffect(() => {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt("my message", "secret key 123");
    console.log(ciphertext);
  }, []);
  return (
    <Layout>
      <Container>
        <Partido />
        <Partido />
        <Navbar className="w-100" fixed="bottom">
          <Button
            className="my-4 center-div w-50 h-100"
            variant="outline-light"
          >
            Guardar Pronósticos
          </Button>
        </Navbar>
      </Container>
    </Layout>
  );
};
