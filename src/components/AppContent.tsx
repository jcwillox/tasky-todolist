import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TaskView from "../views/TaskView";

const AppContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={TaskView} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default AppContent;
