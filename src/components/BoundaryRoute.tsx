import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackView from "../views/ErrorFallbackView";

/** Wraps a Route in an ErrorBoundary */
const BoundaryRoute = (props: RouteProps) => {
  return (
    <ErrorBoundary
      key={props.location?.pathname}
      FallbackComponent={ErrorFallbackView}
    >
      <Route {...props} />
    </ErrorBoundary>
  );
};

export default BoundaryRoute;
