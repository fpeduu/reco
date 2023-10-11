"use client";

import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";
import { useEffect, useState } from "react";

interface SnackBarProps {
  message: string;
  type: string;
}

export default function SnackBar({ message, type }: SnackBarProps) {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarType, setSnackbarType] = useState<string>("error");

  useEffect(() => {
    if (message) {
      setSnackbarMessage(message);
      setSnackbarType(type);
      setShowSnackbar(true);
    }
  }, [message, type]);

  function handleClose() {
    setShowSnackbar(false);
  }

  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarType as AlertColor}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  )
}