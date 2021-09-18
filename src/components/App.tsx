import React from "react";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import { Container, CssBaseline, styled, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import ThemeModeProvider from "./ThemeModeContext";
import { BrowserRouter } from "react-router-dom";

const AppbarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

const containerStyle: SxProps<Theme> = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: {
    xs: 2,
    md: 3
  }
};

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AppHeader />
        <Container maxWidth="md" disableGutters sx={containerStyle}>
          <AppbarOffset />
          <AppContent />
        </Container>
      </BrowserRouter>
    </ThemeModeProvider>
  );
}

export default App;
