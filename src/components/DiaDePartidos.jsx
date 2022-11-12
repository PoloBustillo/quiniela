import React from "react";
import { Accordion, Card, Row } from "react-bootstrap";
import { Partido } from "./Partido";

export const DiaDePartidos = ({ partidosDelDia, dia }) => {
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  let date = new Date(dia).toLocaleDateString("es-US", options);
  let today = new Date().toLocaleDateString("es-US", options);
  let arrayForSort = [...partidosDelDia];
  return (
    <Accordion
      className="mx-4"
      defaultActiveKey={today}
      style={{ backgroundColor: "transparent" }}
    >
      <Accordion.Item
        className="my-2"
        eventKey={date}
        style={{ backgroundColor: "transparent" }}
      >
        <Accordion.Header style={{ backgroundColor: "transparent" }}>
          <span style={{ color: "white", textAlign: "center" }}>
            {`${date[0].toUpperCase()}${date.slice(1)} `}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          <Row>
            {arrayForSort
              .sort((a, b) => {
                return new Date(a.datetime) - new Date(b.datetime);
              })
              .map((partido) => {
                return <Partido key={partido.id} partido={partido}></Partido>;
              })}
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
