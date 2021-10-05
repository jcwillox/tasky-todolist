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
        justifyContent: "center"
      }}
    >
      {children}
    </Box>
  );
};

export default AppView;
