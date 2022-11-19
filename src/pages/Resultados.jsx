import React, { useEffect } from "react";
import { Layout } from "./Layout";
import CountUp from "react-countup";
import { useGetAllPronosticosQuery } from "../redux/firebase/api";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Grid from "@mui/material/Grid";
import { Avatar, Badge } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useAuth } from "../context/authContext";
import { SmallAvatar, headCells, getMisPuntos, getComparator } from "../utils";

function RowData(props) {
  const { row, mine } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: mine ? "green" : "inherit",
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name.split("@")[0]}
        </TableCell>
        <TableCell align="center">
          {row.data.reduce((previousValue, currentValue) => {
            if (currentValue.data?.points)
              return previousValue + currentValue.data.points;
            return previousValue + 0;
          }, 0)}
        </TableCell>
        <TableCell align="center">
          {row.active ? (
            <ThumbUpIcon color="success" />
          ) : (
            <ThumbDownIcon color="error"></ThumbDownIcon>
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
              {row.data.map((dataItem) => {
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
  const [orderBy, setOrderBy] = React.useState("points");
  const { data: pronosticos } = useGetAllPronosticosQuery();

  const { user } = useAuth();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
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
              end={getMisPuntos(pronosticos, user)}
              duration={2}
            ></CountUp>
            <span style={{ fontSize: "5vw", color: "whitesmoke" }}>pts</span>
          </div>
        </div>
        <TableContainer component={Paper} style={{ padding: "0" }}>
          <Table stickyHeader aria-label="collapsible table" size="small">
            <TableHead>
              <TableRow>
                <TableCell />
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
              {orderPronosticos?.map((row) => {
                return (
                  <RowData
                    mine={user.displayName.includes(row.name)}
                    key={row.name}
                    row={row}
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
