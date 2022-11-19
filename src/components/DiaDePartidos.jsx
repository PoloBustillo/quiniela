import styled from "@emotion/styled";
import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import React from "react";
import { Accordion, Row } from "react-bootstrap";
import { Partido } from "./Partido";

export const DiaDePartidos = ({ partidosDelDia, title, maxProgress = 100 }) => {
  const [progress, setProgress] = React.useState(0);

  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  let today = new Date().toLocaleDateString("es-US", options);
  let arrayForSort = [...partidosDelDia];

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    marginLeft: "10px",
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 2,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (maxProgress > progress) {
        setProgress((prevProgress) => prevProgress + 5);
      } else if (progress > maxProgress) {
        setProgress(maxProgress);
      }
    }, 1);
    return () => {
      clearInterval(timer);
    };
  }, [progress, maxProgress]);

  return (
    <Accordion
      className="mx-4"
      defaultActiveKey={today}
      style={{ backgroundColor: "transparent" }}
    >
      <Accordion.Item
        className="my-2"
        eventKey={title}
        style={{ backgroundColor: "transparent" }}
      >
        <Accordion.Header
          style={{ backgroundColor: "transparent", paddingRight: 0 }}
        >
          <span style={{ color: "white", textAlign: "center" }}>{title}</span>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <BorderLinearProgress variant="determinate" value={progress} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`${Math.round(progress)}%`}</Typography>
              </Box>
            </Box>
          </Box>
        </Accordion.Header>
        <Accordion.Body style={{ padding: "0" }}>
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
