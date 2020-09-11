import React from "react";
import { Route, Redirect } from "react-router-dom";
import EventBus from '@/services/EventBus'

export function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
				EventBus.emit('setTitle', rest.title)
        if (Boolean(sessionStorage["token"])) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
