import React from "react";
import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material";
import DarkModeToggle from "./DarkModeToggle";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";


const Spacer = styled("span")({ flexGrow: 1 });

const AppHeader = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        flexGrow: 1,
        backgroundImage: "none"
      }}
    >
      <Toolbar>
        <Box
          sx={{
            marginLeft: -1.5,
            marginRight: 2,
            padding: 0.8,
            width: 42,
            height: 42,
            boxShadow: 4,
            backgroundColor: "primary.main",
            borderRadius: 1.5
          }}
        >
          <LogoIcon
            style={{
              filter: "drop-shadow(3px 3px 3px rgb(0 0 0 / 0.2))"
            }}
          />
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
