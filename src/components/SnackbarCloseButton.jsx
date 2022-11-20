import IconButton from "@mui/material/IconButton";
import { Close as IconClose } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import * as React from "react";

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose />
    </IconButton>
  );
}

export default SnackbarCloseButton;
