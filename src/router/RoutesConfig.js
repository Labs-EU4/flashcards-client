import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

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
    path: "/reset-password",
    component: ForgotPassword,
  },
  {
    path: "*",
    component: PageNotFound,
  },
];

export default RoutesConfig;
