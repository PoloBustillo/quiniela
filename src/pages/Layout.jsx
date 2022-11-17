import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Avatar, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
  const handleChange = (newAlignment) => {
    setAlignment(newAlignment);
  };
  const { user } = useAuth();

  return (
    <Container>
      <Navbar
        className="nav-bar-section"
        style={{ justifyContent: "space-between", marginBottom: "10px" }}
      >
        <ToggleButtonGroup color="secondary" value={alignment} exclusive>
          <ToggleButton
            onClick={() => {
              handleChange("/mis-pronosticos");
              navigation("/mis-pronosticos");
            }}
            value="/mis-pronosticos"
          >
            Pronosticos
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              handleChange("/resultados");
              navigation("/resultados");
            }}
            value="/resultados"
          >
            Resultados
          </ToggleButton>
        </ToggleButtonGroup>

        {user && (
          <>
            <Avatar
              sx={{ width: 56, height: 56, border: "2px solid violet" }}
              onClick={() => {
                navigation("/resultados");
              }}
              alt=""
              referrerPolicy="no-referrer"
              src={`${user?.photoURL}`}
            />

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
          </>
        )}
      </Navbar>
      {children}
    </Container>
  );
};
