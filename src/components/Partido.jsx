import React from "react";
import { faClock, faTShirt, faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Equipos } from "./Equipos";
import { updatePronosticos } from "../redux/slices/pronosticosReducer";
import { useDispatch } from "react-redux";

export const Partido = ({ partido }) => {
  const dispatch = useDispatch();
  return (
    <Col sm={12} style={{ color: "whitesmoke", borderColor: "blueviolet" }}>
      <Card
        className="text-center"
        bg="transparent"
        style={{ color: "whitesmoke", borderColor: "blueviolet" }}
      >
        <Card.Header style={{ color: "whitesmoke !important" }}>
          <Row>
            <Col className="text-muted" style={{ textAlign: "left" }}>
              <span>{partido.home_team.name}</span>
            </Col>

            <Col className="text-muted" style={{ textAlign: "right" }}>
              <span>{partido.away_team.name}</span>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ backgroundColor: "rgb(30,30,30)" }}>
          <Row>
            <Col xs={5}>
              <Equipos
                home={true}
                country={partido.home_team_country}
                name={partido.home_team.name}
              ></Equipos>

              <Row className="my-1">
                <Col>
                  <Form.Control
                    type="number"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      console.log(e.target.value);
                      dispatch(
                        updatePronosticos({
                          partido: partido.id,
                          home_score: e.target.value,
                        })
                      );
                    }}
                    aria-label="Goles"
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={2}>
              <div className="center">
                <img
                  style={{ width: "55%", zIndex: "1000" }}
                  src="/flags/vs.png"
                ></img>
              </div>
            </Col>
            <Col xs={5}>
              <Equipos
                country={partido.away_team_country}
                name={partido.away_team.name}
              ></Equipos>
              <Row className="my-1">
                <Col>
                  <Form.Control
                    type="number"
                    style={{ textAlign: "center" }}
                    aria-label="Goles"
                    onChange={(e) => {
                      console.log(e.target.value);
                      dispatch(
                        updatePronosticos({
                          partido: partido.id,
                          away_score: e.target.value,
                        })
                      );
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col style={{ fontSize: "20px" }}>
              <FontAwesomeIcon
                icon={faClock}
                shake
                transform="shrink-4 left-15"
                swapOpacity
                mask="fa-regular fa-circle"
              />
              {new Date(partido.datetime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Col>
          </Row>
          <Row
            className="text-muted"
            style={{ fontSize: "15px", textAlign: "center" }}
          >
            <Col>{`${partido.location}`}</Col>
          </Row>
          <Row
            className="text-muted"
            style={{ fontSize: "15px", textAlign: "center" }}
          >
            <Col>{`${partido.venue}`}</Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};
