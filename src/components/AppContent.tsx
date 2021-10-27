import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TaskView from "../views/TaskView";
import { useAuth } from "./AuthContext";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import BoundaryRoute from "./BoundaryRoute";
import LandingView from "../views/LandingView";
import AccountView from "../views/AccountView";

const AdminView = lazy(() => import("../views/AdminView"));

const AppContent = () => {
  const auth = useAuth();

  if (auth.user)
    return (
      <Switch>
        <BoundaryRoute exact path="/" component={TaskView} />
        <BoundaryRoute exact path="/admin" component={AdminView} />
        <BoundaryRoute exact path="/account" component={AccountView} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );

  return (
    <Switch>
      <BoundaryRoute exact path="/" component={LandingView} />
      <BoundaryRoute exact path="/login" component={LoginView} />
      <BoundaryRoute exact path="/register" component={RegisterView} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default AppContent;
