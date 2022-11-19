import React from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row } from "react-bootstrap";
import { Equipos } from "./Equipos";
import { updatePronosticos } from "../redux/slices/pronosticosReducer";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

export const Partido = ({ partido, group }) => {
  const dispatch = useDispatch();
  const pronostico = useSelector((state) =>
    state.pronosticosSlice.pronosticos.find((pronostico) => {
      return pronostico?.partidoId === partido.id;
    })
  );

  return (
    <Col sm={12} style={{ color: "whitesmoke", borderColor: "blueviolet" }}>
      <Card
        className="text-center"
        bg="transparent"
        style={{ color: "whitesmoke", borderColor: "blueviolet" }}
      >
        <Card.Body style={{ borderColor: "none" }}>
          <Row>
            <Col xs={5}>
              <Equipos
                home={true}
                country={partido.home_team_country}
                name={partido.home_team.name}
              ></Equipos>

              <Row className="my-1">
                <Col>
                  <TextField
                    id="filled-number"
                    label={partido.home_team.name}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      pronostico?.home_score
                        ? Number.parseInt(
                            pronostico?.home_score
                          ).toLocaleString()
                        : 0
                    }
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => {
                      dispatch(
                        updatePronosticos({
                          partidoId: partido.id,
                          home_score: Number.parseInt(e.target.value),
                          away_score: Number.parseInt(pronostico?.away_score),
                          touched: true,
                          date: partido.datetime,
                        })
                      );
                    }}
                    variant="filled"
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={2}>
              <Row>
                <Col>
                  <div className="center" style={{ zIndex: "1", top: "40%" }}>
                    <img
                      style={{ width: "55%", zIndex: "10" }}
                      alt="VERSUS"
                      src="/flags/vs.png"
                    ></img>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={5}>
              <Equipos
                country={partido.away_team_country}
                name={partido.away_team.name}
              ></Equipos>
              <Row className="my-1">
                <Col>
                  <TextField
                    id="filled-number"
                    label={partido.away_team.name}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                      style: {
                        textAlign: "right",
                        width: "100%",
                      },
                    }}
                    value={
                      pronostico?.away_score
                        ? Number.parseInt(
                            pronostico?.away_score
                          ).toLocaleString()
                        : 0
                    }
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => {
                      dispatch(
                        updatePronosticos({
                          partidoId: partido.id,
                          away_score: Number.parseInt(e.target.value),
                          home_score: Number.parseInt(pronostico?.home_score),
                          touched: true,
                          date: partido.datetime,
                        })
                      );
                    }}
                    variant="filled"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col style={{ fontSize: "20px" }}>
              <FontAwesomeIcon
                icon={faClock}
                shake
                transform="shrink-4 left-15"
                swapOpacity
                mask="fa-regular fa-circle"
              />
              {!group
                ? new Date(partido.datetime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(partido.datetime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    month: "short",
                    day: "2-digit",
                    minute: "2-digit",
                  })}
            </Col>
          </Row>
          <Row
            className="text-muted"
            style={{ fontSize: "15px", textAlign: "center" }}
          >
            <Col>
              {`${partido.location}`} / {`${partido.venue}`}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};
