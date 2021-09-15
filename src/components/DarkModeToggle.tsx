import React from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { useThemeModeToggle } from "./ThemeModeContext";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from "@mui/icons-material";

const DarkModeToggle = () => {
  const theme = useTheme();
  const { toggleThemeMode } = useThemeModeToggle();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={toggleThemeMode}>
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
