import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Navbar,
  Row,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Layout } from "./Layout";
import {
  useGetPartidosQuery,
  useUpdatePronosticosFirebaseMutation,
} from "../redux/firebase/api";
import { DiaDePartidos } from "../components/DiaDePartidos";
import { useSelector } from "react-redux";
import { useAuth } from "../context/authContext";

export const Pronosticos = () => {
  const [showToast, setShowToast] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);
  const { data: partidosByDay, isLoading } = useGetPartidosQuery();
  const [updatePronosticos] = useUpdatePronosticosFirebaseMutation();
  const pronosticos = useSelector(
    (state) => state.pronosticosSlice.pronosticos
  );
  const { user } = useAuth();

  return (
    <Layout>
      <Container fluid>
        {isLoading ? (
          <div className="center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Row>
            <ToastContainer
              className="p-3 position-fixed"
              position={"top-center"}
            >
              <Toast
                bg="success"
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={4000}
                autohide
              >
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">Mensaje del servidor</strong>
                  <small>Datos guardados</small>
                </Toast.Header>
                <Toast.Body>
                  Sus datos han sido guardados. Buena suerte!!
                </Toast.Body>
              </Toast>
            </ToastContainer>
            <ToastContainer
              className="p-3 position-fixed"
              position={"top-center"}
            >
              <Toast
                bg="danger"
                onClose={() => setShowFailToast(false)}
                show={showFailToast}
                delay={4000}
                autohide
              >
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">Mensaje del servidor</strong>
                  <small>Problema con datos</small>
                </Toast.Header>
                <Toast.Body>Contacte por whatsapp</Toast.Body>
              </Toast>
            </ToastContainer>
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
            onClick={async () => {
              updatePronosticos({ body: pronosticos, userId: user.uid })
                .unwrap()
                .then((data) => {
                  setShowToast(true);
                })
                .catch((error) => {
                  console.log(error);
                  setShowFailToast(true);
                });
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
