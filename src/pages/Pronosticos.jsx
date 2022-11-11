import React, { useEffect } from "react";
import { Button, Container, Navbar, Row, Spinner } from "react-bootstrap";
import { Layout } from "./Layout";
import CryptoJS from "crypto-js";
import {
  useGetPartidosQuery,
  useLazyGetTimeQuery,
} from "../redux/firebase/api";
import { DiaDePartidos } from "../components/DiaDePartidos";

export const Pronosticos = () => {
  const { data: partidos, isLoading } = useGetPartidosQuery();
  const [getTime] = useLazyGetTimeQuery();
  console.log(partidos);

  // useEffect(() => {
  //   // Encrypt
  //   // var ciphertext = CryptoJS.AES.encrypt("my message", "secret key 123");
  //   // console.log(ciphertext);
  //   console.log(getTime());
  // }, []);
  return (
    <Layout>
      <Container style={{ height: "110vh" }}>
        {isLoading ? (
          <div className="center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            {Object.keys(partidos).map((dia) => {
              return (
                <DiaDePartidos
                  partidosDelDia={partidos[dia]}
                  dia={dia}
                ></DiaDePartidos>
              );
            })}
          </>
        )}
        <Navbar className="w-100 mt-3" fixed="bottom">
          <Button className="my-4 center-div w-50 h-100" variant="success">
            Guardar Pronósticos
          </Button>
        </Navbar>
      </Container>
    </Layout>
  );
};
