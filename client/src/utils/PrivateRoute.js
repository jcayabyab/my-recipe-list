import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ children, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};
