import React, { useEffect } from "react";
import { Layout } from "./Layout";
import CountUp from "react-countup";
import { useGetAllPronosticosQuery } from "../redux/firebase/api";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Grid from "@mui/material/Grid";
import { Avatar, Badge } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useAuth } from "../context/authContext";
import {
  SmallAvatar,
  headCells,
  getMisPuntos,
  getComparator,
  MONEY,
} from "../utils";
import { compareAsc } from "date-fns";
import {
  AttachMoney,
  EmojiEvents,
  HorizontalRuleTwoTone,
  KeyboardDoubleArrowUpTwoTone,
  MilitaryTech,
  Sports,
} from "@mui/icons-material";
import { Col, Row } from "react-bootstrap";

function RowData(props) {
  const { row, mine, prize, first } = props;
  const [open, setOpen] = React.useState(false);
  let name =
    row.name.split(" ").length > 1
      ? row.name.split(" ")[0] + " " + row.name.split(" ")[1]
      : row.name.split(" ")[0];
  const sumPuntos = () => {
    return row.data.reduce((previousValue, currentValue, i) => {
      if (currentValue.data?.points)
        return previousValue + currentValue.data.points;
      return previousValue + 0;
    }, 0);
  };
  const findLastGame = () => {
    let arry = row.data
      ?.filter((pronostico) => {
        return (
          pronostico.data?.points >= 0 &&
          Date.now() - Date.parse(pronostico.data?.date) > 0
        );
      })
      .sort(function (a, b) {
        return Date.parse(a.data?.date) - Date.parse(b.data?.date);
      });

    return arry[arry.length - 1];
  };
  let lastGame = findLastGame();
  return (
    <React.Fragment>
      <TableRow
        onClick={() => setOpen(!open)}
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: mine ? "green" : "inherit",
          },
        }}
      >
        <TableCell component="th" scope="row">
          {row.active && prize !== 0 ? (
            <Row>
              <Col className="p-0 m-0" xm={{ span: 1, offset: 0 }}>
                {first ? (
                  <EmojiEvents style={{ color: "greenyellow" }}></EmojiEvents>
                ) : (
                  <MilitaryTech style={{ color: "greenyellow" }}></MilitaryTech>
                )}
              </Col>
              <Col xm={{ span: 8 }}>
                {row.name.split(" ")[0]}
                <div style={{ color: "greenyellow", fontSize: "12px" }}>
                  <span>
                    <AttachMoney fontSize="12px"></AttachMoney>
                    {prize}
                  </span>
                </div>
              </Col>
            </Row>
          ) : (
            <div style={{ textAlign: "center" }}>{name}</div>
          )}
        </TableCell>
        <TableCell align="center">{sumPuntos()}</TableCell>
        <TableCell align="center">
          {row.active ? (
            <ThumbUpIcon color="success" />
          ) : (
            <ThumbDownIcon color="error"></ThumbDownIcon>
          )}
        </TableCell>
        <TableCell style={{ paddingLeft: "0" }} scope="row">
          {lastGame?.data.points === 1 ? (
            <div style={{ paddingLeft: "30%" }}>
              <KeyboardArrowUpIcon color="info" />
            </div>
          ) : lastGame?.data.points === 2 ? (
            <>
              <div style={{ paddingLeft: "30%" }}>
                <KeyboardDoubleArrowUpTwoTone color="success" />
              </div>
            </>
          ) : lastGame?.data.home_real_goals === null ? (
            <div style={{ paddingLeft: "30%" }}>
              <Sports color="secondary" />
            </div>
          ) : (
            <div style={{ paddingLeft: "30%" }}>
              <HorizontalRuleTwoTone color="warning" />
            </div>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            collapsedSize={"80vh"}
          >
            <Grid
              container
              style={{ textAlign: "center", marginTop: 0 }}
              spacing={2}
            >
              {row.data
                .filter((dataItem) => {
                  return dataItem.data?.date;
                })
                .sort((a, b) => {
                  const result = compareAsc(
                    new Date(b.data.date),
                    new Date(a.data.date)
                  );
                  return result;
                })
                .map((dataItem) => {
                  if (dataItem?.data) {
                    return (
                      dataItem.data.partido && (
                        <Grid
                          item
                          key={dataItem.data.partido}
                          xs={4}
                          style={{
                            zIndex: "1000",
                            backgroundColor: "#1e1e1e",
                            minHeight: "60px",
                          }}
                        >
                          {dataItem.data.home_final_goals
                            ? dataItem.data.home_final_goals
                            : ""}
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            badgeContent={
                              <SmallAvatar sx={{ bgcolor: blue[500] }}>
                                {dataItem.data?.home_real_goals === null
                                  ? "-"
                                  : dataItem.data.home_real_goals}
                              </SmallAvatar>
                            }
                          >
                            <Badge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              badgeContent={
                                <SmallAvatar sx={{ bgcolor: "gray" }} alt={""}>
                                  {dataItem.data?.home_goals === null
                                    ? "0"
                                    : dataItem.data.home_goals}
                                </SmallAvatar>
                              }
                            >
                              <Avatar
                                style={{
                                  border: `5px solid ${
                                    dataItem.data.winner_real ===
                                    dataItem.data.home_code
                                      ? "green"
                                      : dataItem.data.winner_real === null ||
                                        dataItem.data.winner_real === ""
                                      ? "gray"
                                      : "red"
                                  }`,
                                }}
                                src={`/flags/${dataItem.data.home_code}.svg`}
                              />
                            </Badge>
                          </Badge>

                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar sx={{ bgcolor: blue[500] }} alt={""}>
                                {dataItem.data.away_real_goals === null
                                  ? "-"
                                  : dataItem.data.away_real_goals}
                              </SmallAvatar>
                            }
                          >
                            <Badge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              badgeContent={
                                <SmallAvatar sx={{ bgcolor: "gray" }} alt={""}>
                                  {dataItem.data.away_goals === null
                                    ? "0"
                                    : dataItem.data.away_goals}
                                </SmallAvatar>
                              }
                            >
                              {dataItem.data.points}
                              <Avatar
                                style={{
                                  border: `5px solid ${
                                    dataItem.data.winner_real ===
                                    dataItem.data.away_code
                                      ? "green"
                                      : dataItem.data.winner_real === null ||
                                        dataItem.data.winner_real === ""
                                      ? "gray"
                                      : "red"
                                  }`,
                                }}
                                src={`/flags/${dataItem.data.away_code}.svg`}
                              />
                            </Badge>
                          </Badge>
                          {dataItem.data.away_final_goals
                            ? dataItem.data.away_final_goals
                            : ""}
                        </Grid>
                      )
                    );
                  }
                })}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const Resultados = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderPronosticos, setOrderPronosticos] = React.useState([]);
  const [primeros, setPrimeros] = React.useState([]);
  const [segundos, setSegundos] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("points");
  const { data: pronosticos } = useGetAllPronosticosQuery();

  const getPositions = () => {
    let sorted = [...new Set(pronosticos)]
      .sort(
        (pronosticoA, pronosticoB) =>
          getMisPuntos(pronosticos, pronosticoB?.name) -
          getMisPuntos(pronosticos, pronosticoA?.name)
      )
      .map((pronostico) => {
        return { ...pronostico, rank: 0, prize: 0 };
      });

    for (var i = 0, rank = 1; i < sorted.length; i++) {
      sorted[i].rank = rank;
      if (
        pronosticos[i + 1] &&
        getMisPuntos(pronosticos, sorted[i]?.name) !=
          getMisPuntos(pronosticos, sorted[i + 1]?.name)
      )
        rank++;
    }

    let primeros = sorted.filter((ranked) => {
      return ranked.rank === 1 && ranked.active;
    });
    let segundos = sorted.filter((ranked) => {
      return ranked.rank === 2 && ranked.active;
    });

    if (primeros.length > 1) {
      let prize = MONEY / primeros.length;
      primeros = primeros.map((primer) => {
        return { ...primer, prize: prize };
      });
    } else {
      let prize = (2 * MONEY) / 3;
      let secondPrize = MONEY / (3 * segundos.length);
      primeros = primeros.map((primer) => {
        return { ...primer, prize: prize };
      });
      segundos = segundos.map((primer) => {
        return { ...primer, prize: secondPrize };
      });
    }

    setPrimeros(primeros);
    setSegundos(segundos);
  };

  const { user } = useAuth();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    getPositions();
    if (pronosticos?.length > 0) {
      let newPronosticos = Object.assign([], pronosticos);
      if (orderBy === "name") {
        let orderPronostico = newPronosticos.sort(getComparator(order, "name"));
        setOrderPronosticos(orderPronostico);
      }
      if (orderBy === "points") {
        let orderPronostico = newPronosticos.sort((a, b) => {
          let a_puntos = a.data.reduce((previousValue, currentValue) => {
            if (currentValue.data?.points)
              return previousValue + currentValue.data.points;
            return previousValue + 0;
          }, 0);
          let b_puntos = b.data.reduce((previousValue, currentValue) => {
            if (currentValue.data?.points)
              return previousValue + currentValue.data.points;
            return previousValue + 0;
          }, 0);
          if (order === "desc") {
            return a_puntos - b_puntos;
          }
          if (order === "asc") {
            return b_puntos - a_puntos;
          }
        });

        setOrderPronosticos(orderPronostico);
      }
    }
  }, [orderBy, order, pronosticos]);

  return (
    <Layout>
      <Container fixed style={{ padding: "0" }}>
        <div
          style={{
            color: "white",
            padding: "0",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "15vw" }}>
            <h1>MI PUNTAJE</h1>
            <CountUp
              end={getMisPuntos(pronosticos, user?.displayName)}
              duration={2}
            ></CountUp>
            <span style={{ fontSize: "5vw", color: "whitesmoke" }}>pts</span>
          </div>
        </div>
        <TableContainer component={Paper} style={{ padding: "0" }}>
          <Table stickyHeader aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="center"
                    padding="none"
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(e) => {
                        handleRequestSort(e, headCell.id);
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orderPronosticos?.map((row, index) => {
                let isPrimero = primeros.find((primer) => {
                  return primer.name === row.name;
                });
                let isSegundo = segundos.find((primer) => {
                  return primer.name === row.name;
                });

                return (
                  <RowData
                    mine={user.displayName.includes(row.name)}
                    key={`${row.name}_${index}`}
                    row={row}
                    first={isPrimero || false}
                    prize={
                      isPrimero
                        ? isPrimero.prize
                        : isSegundo
                        ? isSegundo.prize
                        : 0
                    }
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};
