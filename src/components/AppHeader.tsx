import React from "react";
import { AppBar, Box, Link, styled, Toolbar, Typography } from "@mui/material";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import SettingsMenu from "./SettingsMenu";

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
        <Link href="/" color="inherit" underline="none">
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
        </Link>
        <Link href="/" color="inherit" underline="none">
          <Typography variant="h6" noWrap>
            Tasky
          </Typography>
        </Link>
        <Spacer />
        <SettingsMenu />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
