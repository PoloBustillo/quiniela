import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  Avatar,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  initPronosticos,
  updatePronosticos,
} from "../redux/slices/pronosticosReducer";

export const Layout = ({ children }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  const [alignment, setAlignment] = React.useState(location.pathname);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const { user } = useAuth();
  return (
    <Container fluid>
      <Navbar className="nav-bar-section">
        <Container>
          <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton
              onClick={() => {
                navigation("/mis-pronosticos");
              }}
              value="/mis-pronosticos"
            >
              Pronosticos
            </ToggleButton>
            <ToggleButton
              onChange={handleChange}
              onClick={() => {
                navigation("/resultados");
              }}
              value="/resultados"
            >
              Resultados
            </ToggleButton>
          </ToggleButtonGroup>

          {user && (
            <>
              <Nav.Link
                className="d-flex"
                onClick={() => {
                  navigation("/resultados");
                }}
              >
                <Avatar
                  alt=""
                  referrerPolicy="no-referrer"
                  src={`${user?.photoURL}`}
                />
              </Nav.Link>
              <Nav>
                <ToggleButton
                  className="d-flex"
                  onClick={() => {
                    signOut(auth);
                    navigation("/");
                    dispatch(initPronosticos([]));
                    dispatch(updatePronosticos([]));
                  }}
                  value="salir"
                >
                  Salir
                </ToggleButton>
              </Nav>
            </>
          )}
          <Divider light />
        </Container>
      </Navbar>
      {children}
    </Container>
  );
};
