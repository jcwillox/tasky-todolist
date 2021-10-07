import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TaskView from "../views/TaskView";
import { useAuth } from "./AuthContext";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import BoundaryRoute from "./BoundaryRoute";

const AppContent = () => {
  const auth = useAuth();

  if (auth.user)
    return (
      <Switch>
        <BoundaryRoute exact path="/" component={TaskView} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );

  return (
    <Switch>
      <BoundaryRoute exact path="/login" component={LoginView} />
      <BoundaryRoute exact path="/register" component={RegisterView} />
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default AppContent;
