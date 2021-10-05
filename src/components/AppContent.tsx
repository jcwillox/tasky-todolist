import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TaskView from "../views/TaskView";
import { useAuth } from "./AuthContext";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";

const AppContent = () => {
  const auth = useAuth();

  if (auth.user)
    return (
      <Switch>
        <Route exact path="/" component={TaskView} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );

  return (
    <Switch>
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegisterView} />
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default AppContent;
