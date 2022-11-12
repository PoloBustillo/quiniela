import React from "react";
import { Button, Col, Container, Navbar, Row, Spinner } from "react-bootstrap";
import { Layout } from "./Layout";
import CryptoJS from "crypto-js";
import { useGetPartidosQuery } from "../redux/firebase/api";
import { DiaDePartidos } from "../components/DiaDePartidos";

export const Pronosticos = () => {
  const { data: partidosByDay, isLoading } = useGetPartidosQuery();
  //const [getTime] = useLazyGetTimeQuery();
  //console.log(partidosByDay);

  // useEffect(() => {
  //   // Encrypt
  //   // var ciphertext = CryptoJS.AES.encrypt("my message", "secret key 123");
  //   // console.log(ciphertext);
  //   console.log(getTime());
  // }, []);
  return (
    <Layout>
      <Container fluid>
        {isLoading ? (
          <div className="center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Row>
            {partidosByDay.map((partidos) => {
              if (partidos.length > 0)
                return (
                  <Col sm={6}>
                    <DiaDePartidos
                      key={partidos[0].id}
                      partidosDelDia={partidos}
                      dia={partidos[0].datetime}
                    ></DiaDePartidos>
                  </Col>
                );
              return null;
            })}
          </Row>
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
