import React, { Suspense } from "react";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import { ProvideAuth } from "./AuthContext";
import { Container, CssBaseline, styled, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import ThemeModeProvider from "./ThemeModeContext";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./TaskContext";

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
    <ProvideAuth>
      <TaskProvider>
        <ThemeModeProvider>
          <CssBaseline />
          <BrowserRouter>
            <AppHeader />
            <Container maxWidth="md" disableGutters sx={containerStyle}>
              <AppbarOffset />
              <Suspense fallback={<div>Loading...</div>}>
                <AppContent />
              </Suspense>
            </Container>
          </BrowserRouter>
        </ThemeModeProvider>
      </TaskProvider>
    </ProvideAuth>
  );
}

export default App;
