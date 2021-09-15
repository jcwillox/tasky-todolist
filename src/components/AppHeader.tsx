import React from "react";
import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import DarkModeToggle from "./DarkModeToggle";

const Spacer = styled("span")({ flexGrow: 1 });

const AppHeader = () => {
  return (
    <AppBar position="fixed" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          TodoIt
        </Typography>
        <Spacer />
        <DarkModeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
