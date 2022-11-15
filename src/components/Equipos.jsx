import React from "react";
import { Col, Row } from "react-bootstrap";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
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
        <Avatar
          style={{ margin: "auto" }}
          src={`/flags/${country}.svg`}
        ></Avatar>
      </Col>
    </Row>
  );
};
