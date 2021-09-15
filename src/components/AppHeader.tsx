import React from "react";
import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material";
import DarkModeToggle from "./DarkModeToggle";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";

const Spacer = styled("span")({ flexGrow: 1 });

const AppHeader = () => {
  return (
    <AppBar position="fixed" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Box
          sx={{
            marginLeft: -1.5,
            marginRight: 2,
            padding: 1,
            width: 48,
            height: 48
          }}
        >
          <LogoIcon />
        </Box>
        <Typography variant="h6" noWrap>
          Tasky
        </Typography>
        <Spacer />
        <DarkModeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
