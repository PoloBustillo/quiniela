import React, { useEffect } from "react";
import { Button, Col, Container, Navbar, Row, Spinner } from "react-bootstrap";
import { Layout } from "./Layout";
import {
  useGetPartidosQuery,
  useLazyGetTimeQuery,
  useUpdatePronosticosFirebaseMutation,
} from "../redux/firebase/api";
import { DiaDePartidos } from "../components/DiaDePartidos";
import { useSelector } from "react-redux";
import { useAuth } from "../context/authContext";

export const Pronosticos = () => {
  const { data: partidosByDay, isLoading } = useGetPartidosQuery();
  const [updatePronosticos] = useUpdatePronosticosFirebaseMutation();
  const pronosticos = useSelector(
    (state) => state.pronosticosSlice.pronosticos
  );
  const { user } = useAuth();

  const [getTime] = useLazyGetTimeQuery();

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
                  <Col sm={6} key={partidos[0].id}>
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
          <Button
            onClick={() => {
              updatePronosticos({ body: pronosticos, userId: user.uid });
            }}
            className="my-4 center-div w-50 h-100"
            variant="success"
          >
            Guardar Pronósticos
          </Button>
        </Navbar>
      </Container>
    </Layout>
  );
};
