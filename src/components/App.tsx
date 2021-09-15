import React from "react";
import { CssBaseline } from "@mui/material";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import ThemeModeProvider from "./ThemeModeContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TaskView from "../views/TaskView";

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AppHeader />
        <AppContent>
          <Switch>
            <Route exact path="/" component={TaskView} />
          </Switch>
        </AppContent>
      </BrowserRouter>
    </ThemeModeProvider>
  );
}

export default App;
