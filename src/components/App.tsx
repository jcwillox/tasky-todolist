import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";

const theme = createTheme({
  palette: {
    mode: "light"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader />
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
