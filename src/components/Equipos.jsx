import React from "react";
import { Col, Row } from "react-bootstrap";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Equipos = ({ country, name, home }) => {
  return (
    <Row>
      <Col>
        {home && (
          <>
            <FontAwesomeIcon icon={faTShirt} />{" "}
          </>
        )}
        <span>{country}</span>
        {!home && (
          <>
            {" "}
            <FontAwesomeIcon icon={faTShirt} />
          </>
        )}
        <img
          style={{ width: "100%", margin: "auto" }}
          src={`/flags/${country}.svg`}
        ></img>
      </Col>
    </Row>
  );
};
