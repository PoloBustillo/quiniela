import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

export const Partido = ({ partido }) => {
  console.log(partido);
  return (
    <Row className="my-3 ">
      <Col style={{ color: "whitesmoke" }}>
        <Card className="text-center" bg="transparent">
          <Card.Header
            className="text-muted"
            style={{ color: "whitesmoke" }}
          >{`${partido.location}-${partido.venue}`}</Card.Header>
          <Card.Body style={{ backgroundColor: "rgb(30,30,30)" }}>
            <Row>
              <Col>
                <div>{partido.home_team.name.toUpperCase()}</div>
                <img
                  style={{ width: "30%" }}
                  src={`/flags/${partido.home_team_country}.svg`}
                ></img>
                <Button variant="primary">Go somewhere</Button>
              </Col>
              <Col>
                <img style={{ width: "100%" }} src="/flags/vs.png"></img>
              </Col>
              <Col>
                <div>{partido.away_team.name.toUpperCase()}</div>
                <img
                  style={{ width: "30%" }}
                  src={`/flags/${partido.away_team_country}.svg`}
                ></img>
                <Button variant="primary">Go somewhere</Button>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
