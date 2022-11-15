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
export const headCells = [
  {
    id: "name",
    numeric: true,
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
