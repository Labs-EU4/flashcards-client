import React from "react";
import {Route, Switch} from "react-router-dom";

/*
  SwitchRoutes takes in the routes from a routes config, 
  and then displays all the routes in it. Also, it allows 
  for nested routes by passing a routes prop to the
  component. Must be used witha Switch import
*/

const SwitchRoutes = ({routes}) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            exact={route.path === "/" ? true : null}
            key={index}
            path={route.path}
            render={
              route.render
                ? route.render
                : props => <route.component {...props} routes={route.routes} />
            }
          />
        );
      })}
    </Switch>
  );
};

export default SwitchRoutes;
