import React from "react";
import { ReactComponent as GhostIcon } from "../assets/ghost.svg";
import { Box, Button, SvgIcon, Typography } from "@mui/material";

type ErrorFallbackViewProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallbackView = ({ error }: ErrorFallbackViewProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        textAlign: "center"
      }}
    >
      <SvgIcon
        component={GhostIcon}
        viewBox="0 0 832 1024"
        sx={{
          height: "128px",
          width: "auto"
        }}
      />
      <Typography variant="h5" mt={2.5}>
        Something went wrong!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "error.main"
        }}
      >
        {error.message}
      </Typography>
      <Button
        variant="outlined"
        onClick={handleRefresh}
        sx={{
          marginTop: 2
        }}
      >
        Refresh
      </Button>
    </Box>
  );
};

export default ErrorFallbackView;
