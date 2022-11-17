import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Layout } from "./Layout";
import { useSnackbar } from "notistack";
import { useUpdatePronosticosFirebaseMutation } from "../redux/firebase/api";
import { DiaDePartidos } from "../components/DiaDePartidos";
import { useSelector } from "react-redux";
import { useAuth } from "../context/authContext";
import {
  AppBar,
  Fab,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import styled from "@emotion/styled";
const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export const Pronosticos = () => {
  const { user } = useAuth();
  const [group, setGroup] = useState(false);
  const [porcentajes, setPorcentajes] = useState([]);
  const active = useSelector((state) => state.pronosticosSlice.active);
  const { partidosByDay, isLoading } = useSelector(
    (state) => state.partidosSlice
  );
  const { pronosticos } = useSelector((state) => state.pronosticosSlice);

  const [updatePronosticos] = useUpdatePronosticosFirebaseMutation();
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    let porcentajes = partidosByDay?.map((partidos) => {
      if (partidos.length > 0) {
        let indices = partidos
          .map((partido) => {
            return partido.id;
          })
          .filter((id) => {
            return pronosticos[id];
          }).length;
        return (indices / partidos.length) * 100;
      }
      return 0;
    });
    setPorcentajes(porcentajes);
  }, [pronosticos, partidosByDay]);
  return (
    <Layout>
      <Container fluid>
        <FormGroup style={{ flexDirection: "row-reverse" }}>
          <FormControlLabel
            control={
              <Switch
                checked={group}
                onChange={() => {
                  setGroup(!group);
                }}
              />
            }
            label="Grupos"
          />
        </FormGroup>
        {isLoading ? (
          <div className="center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Row>
            {!group ? (
              partidosByDay?.map((partidos, index) => {
                if (partidos.length > 0) {
                  return (
                    <Col sm={6} key={partidos[0].id}>
                      <DiaDePartidos
                        key={partidos[0].id}
                        partidosDelDia={partidos}
                        dia={partidos[0].datetime}
                        maxProgress={porcentajes[index]}
                      ></DiaDePartidos>
                    </Col>
                  );
                }
                return null;
              })
            ) : (
              <Row></Row>
            )}
          </Row>
        )}
        <div style={{ height: "100px" }}></div>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar style={{ minHeight: "40px" }}>
            <StyledFab
              onClick={async () => {
                updatePronosticos({
                  body: pronosticos,
                  userId: user.uid,
                  active: active,
                })
                  .unwrap()
                  .then((data) => {
                    enqueueSnackbar("Pronosticos guardados... Buena suerte!!", {
                      variant: "success",
                      autoHideDuration: "1000",
                      anchorOrigin: { vertical: "top", horizontal: "center" },
                    });
                  })
                  .catch((error) => {
                    enqueueSnackbar(
                      "Error en guardado: contacte por whatsapp 3317700339",
                      {
                        variant: "error",
                        autoHideDuration: "1000",
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "center",
                        },
                      }
                    );
                  });
              }}
              color="secondary"
              aria-label="add"
            >
              <Save />
            </StyledFab>
          </Toolbar>
        </AppBar>
      </Container>
    </Layout>
  );
};
