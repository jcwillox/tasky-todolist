import React from "react";
import Box from "@mui/material/Box";

/**
 * A high level view component, everything inside it will be centered vertically and horizontally
 */

const AppView = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        padding: {
          xs: 1,
          sm: 2,
          md: 3
        }
      }}
    >
      {children}
    </Box>
  );
};

export default AppView;
