import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { Partido } from "./Partido";

export const DiaDePartidos = ({ partidosDelDia, dia }) => {
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  let date = new Date(dia).toLocaleDateString("es-US", options);
  let today = new Date().toLocaleDateString("es-US", options);

  return (
    <Accordion
      defaultActiveKey={today}
      style={{ backgroundColor: "transparent" }}
    >
      <Accordion.Item
        className="my-2"
        eventKey={date}
        style={{ backgroundColor: "transparent" }}
      >
        <Accordion.Header style={{ backgroundColor: "transparent" }}>
          <span
            style={{ color: "white", textAlign: "center" }}
          >{`${date[0].toUpperCase()}${date.slice(1)}`}</span>
        </Accordion.Header>
        <Accordion.Body>
          {partidosDelDia.map((partido) => {
            return <Partido partido={partido}></Partido>;
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
