import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 20,
  height: 20,
  border: `1px solid black`,
}));

export const getMisPuntos = (pronosticos, user) => {
  return pronosticos
    ?.find((pronostico) => {
      return pronostico.name.includes(user.displayName);
    })
    .data.reduce((previousValue, currentValue) => {
      if (currentValue.data?.points)
        return previousValue + currentValue.data.points;
      return previousValue + 0;
    }, 0);
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
export const calculatePoints = (oldGames, decrypted) => {
  let predictions = oldGames.map((partido) => {
    let points = 0;
    if (decrypted[partido.id]) {
      let predicted_winner = null;
      if (decrypted[partido.id].home_score > decrypted[partido.id].away_score) {
        predicted_winner = partido.home_team_country;
      }
      if (decrypted[partido.id].home_score < decrypted[partido.id].away_score) {
        predicted_winner = partido.away_team_country;
      }
      if (
        partido.away_team.goals === decrypted[partido.id].away_score &&
        partido.home_team.goals === decrypted[partido.id].home_score
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
          home_goals: decrypted[partido.id].home_score,
          home_real_goals: partido.home_team.goals,
          away_goals: decrypted[partido.id].away_score,
          away_real_goals: partido.away_team.goals,
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
];
