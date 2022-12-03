import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

export const NUM_JUGADORES = 20;
export const MONEY = NUM_JUGADORES * 150;

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 20,
  height: 20,
  border: `1px solid black`,
}));

export const getMisPuntos = (pronosticos, user) => {
  return (
    pronosticos
      ?.find((pronostico) => {
        return pronostico.name.includes(user);
      })
      ?.data.reduce((previousValue, currentValue) => {
        if (currentValue.data?.points)
          return previousValue + currentValue.data.points;
        return previousValue + 0;
      }, 0) || 0
  );
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const getTouched = (pronosticos) => {
  let touchedPronosticos = pronosticos
    .filter((pronostico) => {
      return pronostico.touched;
    })
    .map((touchedPronosticos) => touchedPronosticos.partidoId);
  return touchedPronosticos;
};

export const getTime = async () => {
  //return "11-23-2022";
  try {
    let response = await fetch(
      "https://worldtimeapi.org/api/timezone/America/Mexico_City"
    );
    let time = await response.json();
    return time.utc_datetime;
  } catch (error) {
    return new Date().toUTCString();
  }
};
export const calculatePoints = (oldGames, decrypted) => {
  let predictions = oldGames.map((partido) => {
    let points = 0;
    let foundPartido = decrypted.find((pronostico) => {
      return partido.id === pronostico.partidoId;
    });

    if (foundPartido) {
      let my_away_goals =
        foundPartido.away_score !== null ? foundPartido.away_score : 0;
      let my_home_goals =
        foundPartido.home_score !== null ? foundPartido.home_score : 0;

      let predicted_winner = null;
      if (my_home_goals > my_away_goals) {
        predicted_winner = partido.home_team_country;
      }
      if (my_home_goals < my_away_goals) {
        predicted_winner = partido.away_team_country;
      }
      if (
        partido.away_team.goals === my_away_goals &&
        partido.home_team.goals === my_home_goals
      ) {
        points = 2;
      } else if (
        predicted_winner === partido.winner &&
        partido.away_team.goals !== null &&
        partido.home_team.goals !== null
      ) {
        points = 1;
      }
      return {
        data: {
          winner_predicted: predicted_winner,
          winner_real: partido.winner,
          home_code: partido.home_team.country,
          away_code: partido.away_team.country,
          home_goals: foundPartido.home_score,
          home_final_goals:
            partido.home_team.goals + partido.home_team.penalties,
          away_final_goals:
            partido.away_team.goals + partido.away_team.penalties,
          home_real_goals: partido.home_team.goals,
          away_goals: foundPartido.away_score,
          away_real_goals: partido.away_team.goals,
          date: partido.datetime,
          partido: partido.id,
          points: points,
        },
      };
    }
    return {};
  });
  return predictions;
};

export const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nombre",
  },
  {
    id: "points",
    numeric: true,
    disablePadding: false,
    label: "Puntos",
  },
  {
    id: "active",
    numeric: false,
    disablePadding: false,
    label: "Pagado",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Ultimos puntos",
  },
];
