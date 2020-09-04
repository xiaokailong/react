import React from 'react';
import {Route,Redirect} from 'react-router-dom';
export function AuthRoute({ component:Component, ...rest }) {
    return (
        <Route {...rest} render={props =>
            Boolean(localStorage['isLogin']) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
        />
    );
}
