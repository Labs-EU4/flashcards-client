import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import Register from "../pages/Register/Register";

import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
/*
  Routes config must be ordered the same way you'd 
  do inside a `<Switch>`. The last route object is 
  a "fallback" route, to catch 404 errors.
*/

const RoutesConfig = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/reset-password",
    component: ForgotPassword,
  },
  {
    path: "/reset/:id",
    component: ResetPassword,
  },
  {
    path: "*",
    component: PageNotFound,
  },
];

export default RoutesConfig;
