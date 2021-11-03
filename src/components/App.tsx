import React, { Suspense } from "react";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import { ProvideAuth } from "./AuthContext";
import { Container, CssBaseline, styled, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import ThemeModeProvider from "./ThemeModeContext";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./TaskContext";
import LoadingBar from "./LoadingBar";

const AppbarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

const containerStyle: SxProps<Theme> = {
  height: "100vh",
  display: "flex",
  flexDirection: "column"
};

function App() {
  return (
    <ProvideAuth>
      <TaskProvider>
        <ThemeModeProvider>
          <CssBaseline />
          <BrowserRouter>
            <AppHeader />
            <Container maxWidth={false} disableGutters sx={containerStyle}>
              <AppbarOffset />
              <Suspense fallback={<LoadingBar />}>
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
