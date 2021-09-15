import React from "react";
import { CssBaseline } from "@mui/material";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import ThemeModeProvider from "./ThemeModeContext";

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <AppHeader />
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;
