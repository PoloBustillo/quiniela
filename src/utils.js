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
