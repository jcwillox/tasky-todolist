import React from "react";
import Box from "@mui/material/Box";

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
