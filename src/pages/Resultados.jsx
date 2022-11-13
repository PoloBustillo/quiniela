import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Layout } from "./Layout";

export const Resultados = () => {
  return (
    <Layout>
      <Row
        className={"center"}
        style={{ color: "white", paddingTop: "30px", width: "100%" }}
      >
        <Col sm={12} className={"mx-3"} style={{ textAlign: "center" }}>
          <div>
            <h1>MI PUNTAJE</h1>
          </div>
          <div style={{ fontSize: "15vw" }}>
            14<span style={{ fontSize: "5vw", color: "whitesmoke" }}>pts</span>
          </div>
          <Table striped style={{ color: "white" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Partido</th>
                <th>Pronostico</th>
                <th>Puntos</th>
                <th>Pagado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Layout>
  );
};
