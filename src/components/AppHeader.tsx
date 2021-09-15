import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const AppHeader = () => {
  return (
    <AppBar position="fixed" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          TodoIt
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
