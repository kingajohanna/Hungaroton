"use client";

import { Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  message: string;
};

const ErrorCard: React.FC<Props> = ({ message }) => {
  const router = useRouter();

  return (
    <Paper
      sx={{
        padding: 4,
        margin: 4,
        textAlign: "center",
      }}
    >
      <p style={{ color: "red" }}>{message}</p>
      <Button
        onClick={router.refresh}
        variant="outlined"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Retry
      </Button>
    </Paper>
  );
};

export default ErrorCard;
